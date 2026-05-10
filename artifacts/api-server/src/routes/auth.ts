import { randomUUID, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { Router, type IRouter } from "express";
import { and, eq, ne } from "drizzle-orm";
import {
  db,
  loginSchema,
  signupSchema,
  updateProfileSchema,
  usersTable,
} from "@workspace/db";

const router: IRouter = Router();
const scrypt = promisify(scryptCallback);

type SafeUser = {
  id: string;
  name: string;
  email: string;
  plan: "free" | "premium";
  joinedAt: string;
  sex: "male" | "female";
  dob: string;
};

function toSafeUser(user: typeof usersTable.$inferSelect): SafeUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    plan: user.plan,
    joinedAt: user.joinedAt,
    sex: user.sex,
    dob: user.dob,
  };
}

async function hashPassword(password: string) {
  const salt = randomUUID();
  const hash = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${hash.toString("hex")}`;
}

async function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const hashBuffer = Buffer.from(hash, "hex");
  const supplied = (await scrypt(password, salt, 64)) as Buffer;
  if (hashBuffer.length !== supplied.length) return false;
  return timingSafeEqual(hashBuffer, supplied);
}

router.post("/auth/signup", async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid signup payload" });
  }

  const payload = parsed.data;
  const existing = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, payload.email.toLowerCase()),
  });
  if (existing) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const userId = randomUUID();
  const today = new Date().toISOString().slice(0, 10);
  const passwordHash = await hashPassword(payload.password);
  const [created] = await db
    .insert(usersTable)
    .values({
      id: userId,
      name: payload.name,
      email: payload.email.toLowerCase(),
      passwordHash,
      plan: "free",
      joinedAt: today,
      sex: payload.sex ?? "male",
      dob: payload.dob ?? "1985-06-15",
    })
    .returning();

  return res.status(201).json({ user: toSafeUser(created) });
});

router.post("/auth/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid login payload" });
  }

  const payload = parsed.data;
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, payload.email.toLowerCase()),
  });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await verifyPassword(payload.password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  return res.json({ user: toSafeUser(user) });
});

router.patch("/auth/me", async (req, res) => {
  const parsed = updateProfileSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid profile payload" });
  }

  const { id, ...updates } = parsed.data;
  if (updates.email) {
    const duplicate = await db.query.usersTable.findFirst({
      where: and(
        eq(usersTable.email, updates.email.toLowerCase()),
        ne(usersTable.id, id),
      ),
    });
    if (duplicate) {
      return res.status(409).json({ error: "Email already exists" });
    }
  }

  const [updated] = await db
    .update(usersTable)
    .set({
      ...updates,
      email: updates.email?.toLowerCase(),
      updatedAt: new Date(),
    })
    .where(eq(usersTable.id, id))
    .returning();

  if (!updated) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json({ user: toSafeUser(updated) });
});

export default router;
