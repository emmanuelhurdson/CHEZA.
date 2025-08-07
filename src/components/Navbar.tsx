"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { User as UserType } from "../App";

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
  user?: UserType | null;
  onLogout?: () => void;
}

export function Navbar({
  currentPage = "home",
  onNavigate,
  user,
  onLogout,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navLinks = [
    { href: "home", label: "Home" },
    { href: "events", label: "Events" },
    { href: "about", label: "Contact" },
  ];

  const handleNavClick = (href: string) => {
    onNavigate?.(href);
    setIsMobileMenuOpen(false);
    setShowUserMenu(false);
  };

  const handleLogout = () => {
    onLogout?.();
    setShowUserMenu(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick("home")}
              className="text-xl font-bold text-primary"
            >
              CHEZA
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3 py-2 text-sm transition-colors ${
                    currentPage === link.href
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-sm bg-accent hover:bg-accent/80 px-3 py-2 rounded-md transition-colors"
                >
                  <User size={16} />
                  <span>{user.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                      {user.email}
                    </div>
                    <button
                      onClick={() => handleNavClick("submit")}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-accent"
                    >
                      Create Event
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-accent flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavClick("login")}
                >
                  Sign In
                </Button>
                <Button size="sm" onClick={() => handleNavClick("signup")}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 text-muted-foreground hover:text-primary"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`block px-3 py-2 text-base w-full text-left transition-colors ${
                  currentPage === link.href
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-primary hover:bg-accent/50"
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-border">
              {user ? (
                <div className="space-y-2">
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Signed in as {user.name}
                  </div>
                  <button
                    onClick={() => handleNavClick("submit")}
                    className="w-full text-left px-3 py-2 text-base text-muted-foreground hover:text-primary hover:bg-accent/50"
                  >
                    Create Event
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-base text-muted-foreground hover:text-primary hover:bg-accent/50 flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => handleNavClick("login")}
                    className="w-full"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => handleNavClick("signup")}
                    className="w-full"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
