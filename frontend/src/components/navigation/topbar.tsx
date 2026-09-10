"use client";

import Link from "next/link";
import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center border-b border-border bg-surface/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      {/* Mobile menu */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="mr-3 rounded-xl p-2 text-foreground-muted transition hover:bg-background hover:text-foreground lg:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Greeting */}
      <div className="hidden min-w-0 flex-1 sm:block">
        <p className="text-xs font-medium text-foreground-muted">
          Welcome back
        </p>

        <h2 className="truncate font-display text-lg font-semibold text-foreground">
          Good morning, Farmer
        </h2>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 sm:flex-none sm:gap-3">
        {/* Search */}
        <button
          type="button"
          aria-label="Search"
          className="hidden rounded-xl border border-border bg-background p-2.5 text-foreground-muted transition hover:border-brand-green hover:text-brand-green md:block"
        >
          <Search size={19} />
        </button>

        {/* Notifications */}
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="relative rounded-xl border border-border bg-background p-2.5 text-foreground-muted transition hover:border-brand-green hover:text-brand-green"
        >
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-lime ring-2 ring-background" />
        </Link>

        {/* Theme Toggle */}
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="rounded-xl border border-border bg-background p-2.5 text-foreground-muted transition hover:border-brand-green hover:text-brand-green"
        >
          <Sun size={19} className="hidden dark:block" />

          <Moon size={19} className="block dark:hidden" />
        </button>
      </div>
    </header>
  );
}