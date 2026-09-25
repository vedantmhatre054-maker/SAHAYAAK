"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  Globe2,
  Leaf,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function LandingNav() {
  const supabase = useMemo(() => createClient(), []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (mounted) {
        setIsLoggedIn(Boolean(data.session?.user));
      }
    };

    void loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setIsLoggedIn(Boolean(session?.user));
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <>
      {/* Fixed Landing Navbar */}
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-border bg-surface/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green text-white">
              <Leaf size={17} />
            </div>

            <div>
              <div className="font-display text-sm font-bold tracking-tight">
                SAHAYAAK
              </div>

              <div className="text-[7px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                Smart Farming
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#solutions"
              className="text-[10px] font-medium text-foreground-muted transition-colors hover:text-brand-green"
            >
              Solutions
            </a>

            <a
              href="#how-it-works"
              className="text-[10px] font-medium text-foreground-muted transition-colors hover:text-brand-green"
            >
              How it works
            </a>

            <Link
              href="/ai-assistant"
              className="text-[10px] font-medium text-foreground-muted transition-colors hover:text-brand-green"
            >
              AI Assistant
            </Link>

            <a
              href="#impact"
              className="text-[10px] font-medium text-foreground-muted transition-colors hover:text-brand-green"
            >
              Success Stories
            </a>

            <a
              href="#resources"
              className="text-[10px] font-medium text-foreground-muted transition-colors hover:text-brand-green"
            >
              Resources
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 md:flex">
            {/* Language */}
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-2 text-[9px] font-semibold transition-colors hover:border-brand-green"
            >
              <Globe2 size={12} />
              EN
              <ChevronDown size={10} />
            </button>

            {/* Account */}
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                aria-label="Open your account"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-brand-green transition-colors hover:bg-brand-green hover:text-white"
              >
                <UserRound size={14} />
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-lg border border-border px-3 py-2 text-[9px] font-semibold transition-colors hover:border-brand-green hover:text-brand-green"
              >
                Sign in
              </Link>
            )}

            {/* Get Started */}
            <Link
              href="/register"
              className="inline-flex items-center gap-1 rounded-lg bg-brand-green px-3.5 py-2 text-[9px] font-bold text-white transition-colors hover:bg-brand-green-dark"
            >
              Get started
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="rounded-lg border border-border p-2 transition-colors hover:border-brand-green md:hidden"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-surface px-5 py-4 shadow-lg md:hidden">
            <nav className="flex flex-col gap-1">
              <a
                href="#solutions"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-foreground-muted transition-colors hover:bg-background hover:text-foreground"
              >
                Solutions
              </a>

              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-foreground-muted transition-colors hover:bg-background hover:text-foreground"
              >
                How it works
              </a>

              <Link
                href="/ai-assistant"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-foreground-muted transition-colors hover:bg-background hover:text-foreground"
              >
                AI Assistant
              </Link>

              <a
                href="#impact"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-foreground-muted transition-colors hover:bg-background hover:text-foreground"
              >
                Success Stories
              </a>

              <a
                href="#resources"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-foreground-muted transition-colors hover:bg-background hover:text-foreground"
              >
                Resources
              </a>

              {/* Mobile Auth Buttons */}
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg border border-border px-4 py-2.5 text-center text-sm font-semibold transition-colors hover:border-brand-green"
                >
                  Sign in
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg bg-brand-green px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
                >
                  Get started
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}