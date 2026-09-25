"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Bot,
  ChevronRight,
  CircleHelp,
  Globe2,
  Lock,
  MessageSquare,
  Palette,
  Settings,
  ShieldCheck,
  UserRound,
  Volume2,
} from "lucide-react";

const settingsSections = [
  {
    title: "Account",
    items: [
      {
        icon: UserRound,
        title: "Profile & Account",
        description: "Manage your personal and farmer information",
      },
    ],
  },
  {
    title: "Preferences",
    items: [
      {
        icon: Globe2,
        title: "Language & Accessibility",
        description: "Language, voice and accessibility preferences",
      },
      {
        icon: Bell,
        title: "Notifications",
        description: "Manage alerts and farming reminders",
      },
      {
        icon: Palette,
        title: "Appearance",
        description: "Choose light, dark or system theme",
      },
    ],
  },
  {
    title: "AI & Voice",
    items: [
      {
        icon: Bot,
        title: "AI Assistant",
        description: "Manage AI assistant preferences",
      },
      {
        icon: Volume2,
        title: "Voice & Speech",
        description: "Manage voice input and AI voice responses",
      },
    ],
  },
  {
    title: "Privacy & Support",
    items: [
      {
        icon: Lock,
        title: "Privacy & Data",
        description: "Understand how your SAHAYAAK data is handled",
      },
      {
        icon: MessageSquare,
        title: "Feedback & Support",
        description: "Share feedback or report a problem",
      },
      {
        icon: CircleHelp,
        title: "Help & FAQs",
        description: "Get help using SAHAYAAK",
      },
    ],
  },
  {
    title: "About",
    items: [
      {
        icon: ShieldCheck,
        title: "About SAHAYAAK",
        description: "Learn more about SAHAYAAK",
      },
    ],
  },
];

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="mb-5 inline-flex items-center gap-2 text-xs font-medium text-foreground-muted transition-colors hover:text-brand-green"
          >
            <ArrowLeft size={15} />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
              <Settings size={23} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Settings
              </h1>
              <p className="mt-1 text-sm text-foreground-muted">
                Manage your SAHAYAAK preferences and account.
              </p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-7">
          {settingsSections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">
                {section.title}
              </h2>

              <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                {section.items.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.title}
                      type="button"
                      className={`group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-background ${
                        index !== section.items.length - 1
                          ? "border-b border-border"
                          : ""
                      }`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-white">
                        <Icon size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-foreground-muted">
                          {item.description}
                        </p>
                      </div>

                      <ChevronRight
                        size={17}
                        className="shrink-0 text-foreground-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand-green"
                      />
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-foreground-muted">
            SAHAYAAK — Smart Solutions for Stronger Farmers
          </p>
          <p className="mt-1 text-[10px] text-foreground-muted/70">
            Settings & preferences
          </p>
        </div>
      </div>
    </main>
  );
}