import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/science", label: "Science" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isHome = location === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" data-testid="nav-logo">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Droplets className="w-4 h-4 text-white" />
              </div>
              <span
                className={`font-serif font-semibold text-lg tracking-tight ${
                  scrolled || !isHome ? "text-foreground" : "text-white"
                }`}
              >
                InsightBlood
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`nav-${link.label.toLowerCase()}`}>
                <span
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    location === link.href
                      ? "text-primary bg-primary/10"
                      : scrolled || !isHome
                      ? "text-foreground/70 hover:text-foreground hover:bg-muted"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className={scrolled || !isHome ? "" : "text-white hover:text-white hover:bg-white/10"}
              data-testid="nav-signin"
            >
              Sign in
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white" data-testid="nav-getstarted">
              Get started free
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 rounded-md transition-colors ${
              scrolled || !isHome ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            data-testid="nav-mobile-toggle"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-border shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`nav-mobile-${link.label.toLowerCase()}`}>
                <span
                  className={`block px-4 py-3 rounded-md text-sm font-medium cursor-pointer ${
                    location === link.href
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <div className="pt-2 border-t border-border flex flex-col gap-2">
              <Button variant="ghost" size="sm" className="justify-start" data-testid="nav-mobile-signin">
                Sign in
              </Button>
              <Button size="sm" className="bg-primary text-white" data-testid="nav-mobile-getstarted">
                Get started free
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
