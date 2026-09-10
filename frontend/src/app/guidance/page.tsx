"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Filter,
  Leaf,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Sprout,
  Tractor,
  Video,
  Wheat,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";

const categories = [
  "All",
  "Crop Basics",
  "Crop Care",
  "Pest & Disease",
  "Harvest",
  "Market",
];

const videos = [
  {
    id: 1,
    title: "Hybrid Maize: Complete Crop Care Guide",
    category: "Crop Care",
    crop: "Maize",
    duration: "08:42",
    level: "Beginner",
    description:
      "Understand the important crop-care practices for healthy maize growth throughout the season.",
    featured: true,
  },
  {
    id: 2,
    title: "How to Identify Early Crop Disease Symptoms",
    category: "Pest & Disease",
    crop: "All Crops",
    duration: "06:18",
    level: "Beginner",
    description:
      "Learn what visual signs to look for when checking leaves, stems, and overall crop health.",
    featured: false,
  },
  {
    id: 3,
    title: "Irrigation Management for Better Crop Growth",
    category: "Crop Care",
    crop: "All Crops",
    duration: "07:25",
    level: "Intermediate",
    description:
      "Learn practical irrigation principles and how to avoid unnecessary water stress.",
    featured: false,
  },
  {
    id: 4,
    title: "Safe Harvesting Practices",
    category: "Harvest",
    crop: "Maize",
    duration: "05:54",
    level: "Beginner",
    description:
      "Follow important steps for harvesting, handling, and protecting produce quality.",
    featured: false,
  },
  {
    id: 5,
    title: "Understanding Mandi Prices Before Selling",
    category: "Market",
    crop: "All Crops",
    duration: "09:10",
    level: "Beginner",
    description:
      "Understand market price movement and the factors to consider before deciding where to sell.",
    featured: false,
  },
  {
    id: 6,
    title: "Preparing Soil Before Sowing",
    category: "Crop Basics",
    crop: "All Crops",
    duration: "06:45",
    level: "Beginner",
    description:
      "Learn the basic preparation steps that help create a suitable foundation for your crop.",
    featured: false,
  },
];

const quickTopics = [
  {
    title: "Crop health",
    description: "Learn how to spot early warning signs.",
    icon: Leaf,
  },
  {
    title: "Water management",
    description: "Improve irrigation decisions.",
    icon: Sprout,
  },
  {
    title: "Harvest",
    description: "Protect quality after harvest.",
    icon: Wheat,
  },
  {
    title: "Selling",
    description: "Prepare before going to market.",
    icon: Tractor,
  },
];

export default function GuidancePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVideos = videos.filter((video) => {
    const matchesCategory =
      activeCategory === "All" || video.category === activeCategory;

    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !search ||
      video.title.toLowerCase().includes(search) ||
      video.description.toLowerCase().includes(search) ||
      video.crop.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  const featuredVideo = videos.find((video) => video.featured);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-sm sm:p-8">
          <div className="relative z-10 max-w-4xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              <Video className="h-3.5 w-3.5" />
              Video Guidance
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Learn farming, one step at a time.
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
              Practical farming guidance designed to help you understand crop
              care, disease prevention, harvesting, and selling decisions.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2.5 text-xs backdrop-blur-sm">
                <Play className="h-3.5 w-3.5" />
                Step-by-step videos
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2.5 text-xs backdrop-blur-sm">
                <BookOpen className="h-3.5 w-3.5" />
                Farmer-friendly learning
              </div>
            </div>
          </div>

          <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-lime/20 blur-3xl" />
          <div className="absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        </section>

        {/* Search */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Find the right guidance
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Search videos by crop, topic, or farming activity.
              </p>
            </div>

            <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 lg:max-w-md">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search farming guidance..."
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="mr-1 h-4 w-4 shrink-0 text-muted-foreground" />

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Featured video */}
        {featuredVideo && (
          <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[260px] overflow-hidden bg-primary/10 lg:min-h-[360px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-lime/10 to-background" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                    <Play className="ml-1 h-8 w-8 fill-current" />
                  </div>
                </div>

                <div className="absolute left-5 top-5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
                  Featured guidance
                </div>

                <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-lg bg-black/40 px-3 py-2 text-xs text-white backdrop-blur-sm">
                  <Clock3 className="h-3.5 w-3.5" />
                  {featuredVideo.duration}
                </div>
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-medium text-primary">
                  <Sparkles className="h-4 w-4" />
                  Recommended for you
                </div>

                <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {featuredVideo.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {featuredVideo.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                    {featuredVideo.crop}
                  </span>

                  <span className="rounded-full bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    {featuredVideo.level}
                  </span>

                  <span className="rounded-full bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    {featuredVideo.category}
                  </span>
                </div>

                <button
                  type="button"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Watch video
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Quick topics */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Explore by topic
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Start with a topic that matches what you need today.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickTopics.map((topic) => {
              const Icon = topic.icon;

              return (
                <button
                  key={topic.title}
                  type="button"
                  className="group rounded-2xl border border-border bg-surface p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-foreground">
                    {topic.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {topic.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Video library */}
        <section>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Farming video library
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Practical guidance for everyday farming decisions.
              </p>
            </div>

            <span className="text-xs text-muted-foreground">
              {filteredVideos.length} videos
            </span>
          </div>

          {filteredVideos.length === 0 ? (
            <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Search className="h-5 w-5 text-primary" />
              </div>

              <h3 className="mt-4 font-semibold text-foreground">
                No guidance found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try another crop, topic, or category.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredVideos.map((video) => (
                <article
                  key={video.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30"
                >
                  {/* Video thumbnail placeholder */}
                  <div className="relative aspect-video overflow-hidden bg-primary/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-lime/10 to-background" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition group-hover:scale-105">
                        <Play className="ml-0.5 h-5 w-5 fill-current" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3 rounded-lg bg-black/45 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                      {video.duration}
                    </div>

                    <div className="absolute right-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-medium text-foreground">
                      {video.level}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
                        {video.category}
                      </span>

                      <span className="rounded-full bg-background px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                        {video.crop}
                      </span>
                    </div>

                    <h3 className="mt-3 line-clamp-2 font-semibold text-foreground">
                      {video.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
                      {video.description}
                    </p>

                    <button
                      type="button"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary"
                    >
                      Watch guidance
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* AI personalized guidance */}
        <section className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 shadow-sm">
          <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Personalized AI Guidance
                </p>

                <h2 className="mt-1 font-semibold text-foreground">
                  Need guidance for your specific crop?
                </h2>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Ask SAHAYAAK about your crop, show an image, or describe the
                  problem in your preferred language to receive personalized
                  guidance.
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

        {/* Trust / learning note */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h2 className="font-semibold text-foreground">
                Learn from trusted agricultural guidance
              </h2>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                SAHAYAAK is designed to surface useful, understandable farming
                guidance while keeping official agricultural and government
                information clearly distinguished from AI-generated assistance.
              </p>

              <div className="mt-3 flex items-center gap-2 text-xs font-medium text-primary">
                <CheckCircle2 className="h-4 w-4" />
                Guidance library will be connected to verified sources
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <p className="text-center text-xs leading-5 text-muted-foreground">
          Video thumbnails, titles, descriptions, and durations shown here are
          illustrative UI data. Real agricultural videos and verified knowledge
          resources will be connected during the integration phase.
        </p>
      </div>
    </AppShell>
  );
}