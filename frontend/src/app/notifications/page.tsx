"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  CloudRain,
  Info,
  IndianRupee,
  Leaf,
  Package,
  Sparkles,
  Sprout,
  TrendingUp,
  X,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";

type NotificationType =
  | "weather"
  | "crop"
  | "market"
  | "sale"
  | "scheme"
  | "ai"
  | "success";

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  action?: string;
  href?: string;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "weather",
    title: "Rain expected tomorrow",
    description:
      "Rain is expected in your area. Consider checking your irrigation schedule and protecting harvested produce.",
    time: "15 min ago",
    unread: true,
    action: "View weather",
    href: "/dashboard",
  },
  {
    id: 2,
    type: "market",
    title: "Maize prices are rising",
    description:
      "The latest market signal indicates a positive movement in maize prices at nearby markets.",
    time: "1 hour ago",
    unread: true,
    action: "View market",
    href: "/market",
  },
  {
    id: 3,
    type: "crop",
    title: "Crop activity reminder",
    description:
      "Your Hybrid Maize crop has a pending activity. Review your crop schedule and update its progress.",
    time: "3 hours ago",
    unread: true,
    action: "View crop",
    href: "/crops",
  },
  {
    id: 4,
    type: "sale",
    title: "Produce sale completed",
    description:
      "Your recent produce sale has been recorded successfully. Payment and transaction details are available.",
    time: "Yesterday",
    unread: false,
    action: "View sale",
    href: "/sales",
  },
  {
    id: 5,
    type: "scheme",
    title: "New scheme match found",
    description:
      "SAHAYAAK found a government scheme that may match your farmer profile and farm requirements.",
    time: "Yesterday",
    unread: false,
    action: "View schemes",
    href: "/schemes",
  },
  {
    id: 6,
    type: "ai",
    title: "Farm insight available",
    description:
      "Your recent farm records reveal a useful profitability pattern. Review the latest AI-generated insight.",
    time: "2 days ago",
    unread: false,
    action: "View history",
    href: "/history",
  },
  {
    id: 7,
    type: "success",
    title: "Mandi booking confirmed",
    description:
      "Your selected mandi slot has been successfully reserved for your produce movement.",
    time: "3 days ago",
    unread: false,
    action: "View booking",
    href: "/facilities",
  },
];

const filters = ["All", "Unread", "Weather", "Crops", "Market", "Finance"];

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "weather":
      return <CloudRain className="h-5 w-5" />;
    case "crop":
      return <Sprout className="h-5 w-5" />;
    case "market":
      return <TrendingUp className="h-5 w-5" />;
    case "sale":
      return <IndianRupee className="h-5 w-5" />;
    case "scheme":
      return <Package className="h-5 w-5" />;
    case "ai":
      return <Sparkles className="h-5 w-5" />;
    case "success":
      return <CheckCircle2 className="h-5 w-5" />;
    default:
      return <Info className="h-5 w-5" />;
  }
}

function getNotificationStyle(type: NotificationType) {
  switch (type) {
    case "weather":
      return "bg-sky-500/10 text-sky-600 dark:text-sky-400";
    case "crop":
      return "bg-primary/10 text-primary";
    case "market":
      return "bg-lime/15 text-primary";
    case "sale":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "scheme":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
    case "ai":
      return "bg-primary/10 text-primary";
    case "success":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [activeFilter, setActiveFilter] = useState("All");

  const unreadCount = notifications.filter(
    (notification) => notification.unread,
  ).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "Unread") {
      return notification.unread;
    }

    if (activeFilter === "Weather") {
      return notification.type === "weather";
    }

    if (activeFilter === "Crops") {
      return notification.type === "crop";
    }

    if (activeFilter === "Market") {
      return notification.type === "market";
    }

    if (activeFilter === "Finance") {
      return notification.type === "sale";
    }

    return true;
  });

  function markAsRead(id: number) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification,
      ),
    );
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      })),
    );
  }

  function removeNotification(id: number) {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id),
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-sm sm:p-8">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              <Bell className="h-3.5 w-3.5" />
              Notifications
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Stay informed about your farm.
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
                  Important updates about weather, crops, markets, schemes,
                  sales, and your SAHAYAAK recommendations.
                </p>
              </div>

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <Bell className="h-7 w-7" />
              </div>
            </div>
          </div>

          <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-lime/20 blur-3xl" />
          <div className="absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        </section>

        {/* Notification summary */}
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Total notifications
            </p>

            <p className="mt-1 text-2xl font-semibold text-foreground">
              {notifications.length}
            </p>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <AlertTriangle className="h-5 w-5 text-primary-foreground" />
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Unread notifications
            </p>

            <p className="mt-1 text-2xl font-semibold text-primary">
              {unreadCount}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime/15">
              <Leaf className="h-5 w-5 text-primary" />
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Farm updates
            </p>

            <p className="mt-1 text-2xl font-semibold text-foreground">7</p>
          </div>
        </section>

        {/* Controls */}
        <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    activeFilter === filter
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Check className="h-4 w-4" />
              Mark all as read
            </button>
          </div>
        </section>

        {/* Notification list */}
        <section className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Bell className="h-5 w-5 text-primary" />
              </div>

              <h2 className="mt-4 font-semibold text-foreground">
                No notifications here
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                You&apos;re all caught up for this category.
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <article
                key={notification.id}
                className={`group rounded-2xl border bg-surface p-4 shadow-sm transition sm:p-5 ${
                  notification.unread
                    ? "border-primary/20"
                    : "border-border"
                }`}
              >
                <div className="flex gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getNotificationStyle(
                      notification.type,
                    )}`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-semibold text-foreground">
                            {notification.title}
                          </h2>

                          {notification.unread && (
                            <span className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeNotification(notification.id)}
                        aria-label={`Remove ${notification.title}`}
                        className="self-end rounded-lg p-2 text-muted-foreground opacity-100 transition hover:bg-muted hover:text-foreground sm:self-start sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                      {notification.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      {notification.href && notification.action ? (
                        <Link
                          href={notification.href}
                          onClick={() => markAsRead(notification.id)}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                        >
                          {notification.action}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      ) : null}

                      {notification.unread && (
                        <button
                          type="button"
                          onClick={() => markAsRead(notification.id)}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                        >
                          <Check className="h-4 w-4" />
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>

        {/* AI notification panel */}
        <section className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 shadow-sm">
          <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  SAHAYAAK Smart Alerts
                </p>

                <h2 className="mt-1 font-semibold text-foreground">
                  Get decisions before they become problems.
                </h2>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                  SAHAYAAK can surface useful alerts from weather, crop
                  activity, market movement, schemes, and your farm records.
                </p>
              </div>
            </div>

            <Link
              href="/ai-assistant"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Ask SAHAYAAK
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Notification preferences */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Notification preferences
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Choose the types of updates that should be highlighted for you.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: CloudRain,
                title: "Weather",
                description: "Rain and weather alerts",
              },
              {
                icon: Sprout,
                title: "Crops",
                description: "Crop activity reminders",
              },
              {
                icon: TrendingUp,
                title: "Market",
                description: "Price and market movement",
              },
              {
                icon: IndianRupee,
                title: "Finance",
                description: "Sales and payment updates",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-background p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.title}
                      </p>

                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Disclaimer */}
        <p className="text-center text-xs leading-5 text-muted-foreground">
          Notification content shown here is illustrative UI data. Real-time
          weather, crop, market, scheme, transaction, and AI alerts will be
          connected during the integration phase.
        </p>
      </div>
    </AppShell>
  );
}