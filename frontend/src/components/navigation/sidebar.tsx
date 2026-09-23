"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Bell,
  Bot,
  FileText,
  Home,
  Leaf,
  MapPinned,
  Package,
  Settings,
  Store,
  Tractor,
  Truck,
  Video,
  Wallet,
  X,
  Gavel,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import {
  DEFAULT_LANGUAGE,
  getLanguageCodeByName,
} from "@/lib/i18n/config";
import { getTranslations } from "@/lib/i18n/translations";
import type { LanguageCode } from "@/lib/i18n/config";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    key: "dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    key: "myFarm",
    icon: Tractor,
    href: "/farm",
  },
  {
    key: "cropsAndFarming",
    icon: Leaf,
    href: "/crops",
  },
  {
    key: "marketAndSelling",
    icon: Store,
    href: "/market",
  },
  {
    key: "schemesAndLoans",
    icon: FileText,
    href: "/schemes",
  },
  {
    key: "aiAssistant",
    icon: Bot,
    href: "/ai-assistant",
  },
] as const;

const operationsNavigation = [
  {
    key: "transport",
    icon: Truck,
    href: "/transport",
  },
  {
    key: "mandiAndGodown",
    icon: MapPinned,
    href: "/facilities",
  },
  {
    key: "marketplace",
    icon: Package,
    href: "/marketplace",
  },
  {
    key: "auction",
    icon: Gavel,
    href: "/auction",
  },
  {
    key: "salesAndTransactions",
    icon: Wallet,
    href: "/sales",
  },
  {
    key: "profitAndAnalysis",
    icon: BarChart3,
    href: "/profit",
  },
  {
    key: "farmHistory",
    icon: Leaf,
    href: "/history",
  },
] as const;

const secondaryNavigation = [
  {
    label: "Notifications",
    icon: Bell,
    href: "/notifications",
  },
  {
    label: "Help & Guidance",
    icon: Video,
    href: "/guidance",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "#",
  },
];

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const [language, setLanguage] =
    useState<LanguageCode>(DEFAULT_LANGUAGE);

  const tr = getTranslations(language);

  useEffect(() => {
    const loadLanguage = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const { data: profile } = await supabase
        .from("farmer_profiles")
        .select("preferred_language")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profile?.preferred_language) {
        setLanguage(
          getLanguageCodeByName(profile.preferred_language),
        );
      }
    };

    loadLanguage();
  }, []);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const renderNavigationItem = (
    item:
      | (typeof navigation)[number]
      | (typeof operationsNavigation)[number],
  ) => {
    const Icon = item.icon;
    const active = isActive(item.href);

    const label = tr[item.key];

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onClose}
        className={[
          "group flex w-full items-center gap-3 rounded-xl px-3 py-3",
          "text-sm font-medium transition-all",
          active
            ? "bg-brand-green text-white shadow-sm"
            : "text-foreground-muted hover:bg-background hover:text-foreground",
        ].join(" ")}
      >
        <Icon
          size={19}
          strokeWidth={active ? 2.2 : 2}
          className={
            active
              ? "text-white"
              : "text-foreground-muted group-hover:text-brand-green"
          }
        />

        <span>{label}</span>

        {item.key === "aiAssistant" && (
          <span className="ml-auto rounded-full bg-brand-lime px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black">
            AI
          </span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col",
          "border-r border-border bg-surface",
          "transform transition-transform duration-300",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full",
          "lg:!translate-x-0",
        ].join(" ")}
      >
        {/* Brand */}
        <div className="flex h-20 items-center justify-between border-b border-border px-6">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green text-white shadow-sm">
              <Leaf size={22} strokeWidth={2.2} />
            </div>

            <div>
              <h1 className="font-display text-xl font-bold tracking-tight text-foreground">
                SAHAYAAK
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-foreground-muted">
                {tr.smartFarming}
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-foreground-muted hover:bg-background hover:text-foreground lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          {/* Main Menu */}
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
            Main Menu
          </p>

          <div className="space-y-1">
            {navigation.map(renderNavigationItem)}
          </div>

          {/* Operations */}
          <div className="my-6 h-px bg-border" />

          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
            Farm Operations
          </p>

          <div className="space-y-1">
            {operationsNavigation.map(renderNavigationItem)}
          </div>

          {/* Support */}
          <div className="my-6 h-px bg-border" />

          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
            Support
          </p>

          <div className="space-y-1">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon;
              const active =
                item.href !== "#" && isActive(item.href);

              if (item.href === "#") {
                return (
                  <button
                    key={item.label}
                    type="button"
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-foreground-muted transition-all hover:bg-background hover:text-foreground"
                  >
                    <Icon
                      size={19}
                      className="group-hover:text-brand-green"
                    />

                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={[
                    "group flex w-full items-center gap-3 rounded-xl px-3 py-3",
                    "text-sm font-medium transition-all",
                    active
                      ? "bg-brand-green text-white shadow-sm"
                      : "text-foreground-muted hover:bg-background hover:text-foreground",
                  ].join(" ")}
                >
                  <Icon
                    size={19}
                    className={
                      active
                        ? "text-white"
                        : "text-foreground-muted group-hover:text-brand-green"
                    }
                  />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Farmer Profile Card */}
        <div className="border-t border-border p-4">
          <Link
            href="/profile"
            onClick={onClose}
            className="block rounded-2xl bg-background p-4 transition hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-white">
                FM
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {tr.farmerProfile}
                </p>

                <p className="truncate text-xs text-foreground-muted">
                  {tr.viewProfile}
                </p>
              </div>

              <Wallet
                size={17}
                className="ml-auto text-brand-green"
              />
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}