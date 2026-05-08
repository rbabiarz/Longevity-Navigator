import { Link } from "wouter";
import { Droplets, ExternalLink } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Science", href: "/science" },
    { label: "Pricing", href: "/pricing" },
    { label: "Security", href: "#" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  Resources: [
    { label: "Source Library", href: "/science" },
    { label: "Help Center", href: "#" },
    { label: "HIPAA Posture", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Wellness Disclaimer", href: "#" },
    { label: "Data Deletion", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Droplets className="w-4 h-4 text-white" />
                </div>
                <span className="font-serif font-semibold text-lg text-white tracking-tight">
                  InsightBlood
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-background/60 max-w-xs">
              Personal blood work intelligence. Longitudinal trends, evidence-backed insights, and research citations from the world's leading medical literature.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-background/40">
              <ExternalLink className="w-3 h-3" />
              <span>Citations drawn from PubMed, NEJM, Lancet, JAMA, Cochrane</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-background/40 mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <span className="text-sm text-background/60 hover:text-background transition-colors cursor-pointer">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            &copy; {new Date().getFullYear()} InsightBlood. All rights reserved.
          </p>
          <p className="text-xs text-background/30 text-center max-w-lg">
            InsightBlood is not a medical device. Not diagnostic. Not a substitute for a clinician. Educational and wellness purposes only, per FDA General Wellness guidance (Jan 2026).
          </p>
        </div>
      </div>
    </footer>
  );
}
