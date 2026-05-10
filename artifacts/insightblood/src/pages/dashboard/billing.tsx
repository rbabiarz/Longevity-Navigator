import { useEffect } from "react";
import { useLocation } from "wouter";

export default function DashboardBilling() {
  const [, navigate] = useLocation();
  useEffect(() => {
    navigate("/dashboard/settings?tab=billing", { replace: true });
  }, [navigate]);
  return null;
}
