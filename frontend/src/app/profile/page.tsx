"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Leaf,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

import { SUPPORTED_LANGUAGES } from "@/lib/i18n/config";

export default function FarmerProfilePage() {
  const supabase = createClient();
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [casteCategory, setCasteCategory] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("English");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      setUserId(user.id);
      setEmail(user.email ?? "");

      const metadataName = user.user_metadata?.full_name ?? "";

      const { data: profile, error } = await supabase
        .from("farmer_profiles")
        .select(
          "full_name, age, gender, caste_category, phone, email, preferred_language",
        )
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      if (profile) {
        setFullName(profile.full_name ?? metadataName);
        setAge(profile.age ? String(profile.age) : "");
        setGender(profile.gender ?? "");
        setCasteCategory(profile.caste_category ?? "");
        setPhone(profile.phone ?? "");
        setPreferredLanguage(profile.preferred_language ?? "English");
      } else {
        setFullName(metadataName);
        setPhone(user.user_metadata?.mobile ?? "");
      }

      setIsLoading(false);
    };

    loadProfile();
  }, [router, supabase]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (age && (Number(age) < 18 || Number(age) > 120)) {
      setErrorMessage("Please enter a valid age between 18 and 120.");
      return;
    }

    setIsSaving(true);

    const { error } = await supabase.from("farmer_profiles").upsert(
      {
        user_id: userId,
        full_name: fullName.trim(),
        age: age ? Number(age) : null,
        gender: gender || null,
        caste_category: casteCategory || null,
        phone: phone.trim() || null,
        email,
        preferred_language: preferredLanguage,
      },
      {
        onConflict: "user_id",
      },
    );

    setIsSaving(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green text-white">
            <Leaf size={24} />
          </div>

          <p className="mt-4 text-sm font-semibold text-foreground-muted">
            Loading your profile...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green text-white shadow-sm">
            <Leaf size={27} />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
            Farmer profile
          </p>

          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Tell us about yourself
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-foreground-muted">
            These details help SAHAYAAK personalize farming guidance,
            recommendations and services for you.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Full name */}
            <div className="sm:col-span-2">
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-semibold"
              >
                Full name
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted"
                />

                <input
                  id="fullName"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted"
                />

                <input
                  id="email"
                  value={email}
                  readOnly
                  className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground-muted outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold"
              >
                Mobile number
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted"
                />

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Enter mobile number"
                  className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                />
              </div>
            </div>

            {/* Age */}
            <div>
              <label
                htmlFor="age"
                className="mb-2 block text-sm font-semibold"
              >
                Age
              </label>

              <input
                id="age"
                type="number"
                min="18"
                max="120"
                value={age}
                onChange={(event) => setAge(event.target.value)}
                placeholder="Your age"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
              />
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="mb-2 block text-sm font-semibold"
              >
                Gender
              </label>

              <select
                id="gender"
                value={gender}
                onChange={(event) => setGender(event.target.value)}
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
              >
                <option value="">Prefer not to say</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Caste */}
            <div>
              <label
                htmlFor="casteCategory"
                className="mb-2 block text-sm font-semibold"
              >
                Caste category
                <span className="ml-2 text-xs font-normal text-foreground-muted">
                  Optional
                </span>
              </label>

              <select
                id="casteCategory"
                value={casteCategory}
                onChange={(event) => setCasteCategory(event.target.value)}
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
              >
                <option value="">Prefer not to say</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label
                htmlFor="preferredLanguage"
                className="mb-2 block text-sm font-semibold"
              >
                Preferred language
              </label>

              <select
                id="preferredLanguage"
                value={preferredLanguage}
                onChange={(event) =>
                  setPreferredLanguage(event.target.value)
                }
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
              >
                {SUPPORTED_LANGUAGES.map((language) => (
                <option key={language.code} value={language.name}>
                  {language.nativeName} ({language.name})
                </option>
              ))}
              </select>
            </div>
          </div>

          {/* Error */}
          {errorMessage && (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400">
              {errorMessage}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSaving}
            className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving profile..." : "Save and continue"}
            {!isSaving && <ArrowRight size={17} />}
          </button>
        </form>

        <p className="mt-6 text-center text-xs leading-5 text-foreground-muted">
          Your profile information is securely stored in your SAHAYAAK account.
        </p>
      </div>
    </main>
  );
}