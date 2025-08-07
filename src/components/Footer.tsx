import { Facebook, Instagram, Twitter } from "lucide-react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-muted mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Mobile: 2 columns, Desktop: 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-3 md:space-y-4">
            <h3 className="text-lg font-semibold text-primary">CHEZA</h3>
            <p className="text-sm text-muted-foreground pr-4 md:pr-0">
              Discover amazing events happening around you. Join the community
              and never miss out.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="font-semibold text-sm md:text-base">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: "Home", href: "home" },
                { label: "All Events", href: "events" },
                { label: "Submit Event", href: "submit" },
                { label: "About Us", href: "about" },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => onNavigate?.(link.href)}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="font-semibold text-sm md:text-base">Legal</h4>
            <div className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <button
                    key={item}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="font-semibold text-sm md:text-base">Connect</h4>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">hello@cheza.app</p>
              <div className="flex space-x-4">
                <button
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram size={18} />
                </button>
                <button
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter size={18} />
                </button>
                <button
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-6 md:pt-8 mt-6 md:mt-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 CHEZA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
