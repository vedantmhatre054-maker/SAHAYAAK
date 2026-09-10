"use client";

import { FormEvent, useCallback, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Droplets,
  Loader2,
  Plus,
  Sprout,
  Tractor,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface CropActivitiesProps {
  cropCycleId: string;
}

interface Activity {
  id: string;
  activity_type: string;
  activity_date: string;
  description: string | null;
  quantity: number | null;
  unit: string | null;
  cost: number | null;
  notes: string | null;
}

const activityTypes = [
  "Sowing",
  "Irrigation",
  "Fertilizer",
  "Pesticide",
  "Weeding",
  "Cultivation",
  "Other",
];

export function CropActivities({
  cropCycleId,
}: CropActivitiesProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadActivities = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    const supabase = createClient();

    const { data, error } = await supabase
      .from("crop_activities")
      .select(
        "id, activity_type, activity_date, description, quantity, unit, cost, notes",
      )
      .eq("crop_cycle_id", cropCycleId)
      .order("activity_date", { ascending: false });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      setHasLoaded(true);
      return;
    }

    setActivities((data as Activity[]) ?? []);
    setIsLoading(false);
    setHasLoaded(true);
  }, [cropCycleId]);

  const handleLoadActivities = async () => {
    if (!hasLoaded) {
      await loadActivities();
    }
  };

  if (!hasLoaded && !isLoading) {
    void handleLoadActivities();
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const activityType = String(
      formData.get("activityType") ?? "",
    ).trim();

    const activityDate = String(
      formData.get("activityDate") ?? "",
    ).trim();

    const description = String(
      formData.get("description") ?? "",
    ).trim();

    const quantityValue = String(
      formData.get("quantity") ?? "",
    ).trim();

    const unit = String(
      formData.get("unit") ?? "",
    ).trim();

    const costValue = String(
      formData.get("cost") ?? "",
    ).trim();

    const notes = String(
      formData.get("notes") ?? "",
    ).trim();

    if (!activityType || !activityDate) {
      setErrorMessage(
        "Please select an activity and activity date.",
      );
      setIsSaving(false);
      return;
    }

    const quantity = quantityValue
      ? Number(quantityValue)
      : null;

    const cost = costValue
      ? Number(costValue)
      : null;

    if (
      (quantity !== null && !Number.isFinite(quantity)) ||
      (cost !== null && !Number.isFinite(cost))
    ) {
      setErrorMessage(
        "Quantity and cost must contain valid numbers.",
      );
      setIsSaving(false);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase
      .from("crop_activities")
      .insert({
        crop_cycle_id: cropCycleId,
        activity_type: activityType,
        activity_date: activityDate,
        description: description || null,
        quantity,
        unit: unit || null,
        cost,
        notes: notes || null,
      });

    if (error) {
      setErrorMessage(error.message);
      setIsSaving(false);
      return;
    }

    form.reset();

    setShowForm(false);
    setSuccessMessage("Activity added successfully.");
    setIsSaving(false);

    await loadActivities();
  };

  return (
    <section className="mt-7 rounded-2xl border border-border bg-surface p-6 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
            <Sprout size={21} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-green">
              Crop activities
            </p>

            <h2 className="mt-1 font-display text-2xl font-bold text-foreground">
              Farm activity tracking
            </h2>

            <p className="mt-2 text-sm leading-6 text-foreground-muted">
              Record the important work done for this crop.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowForm((value) => !value);
            setErrorMessage("");
            setSuccessMessage("");
          }}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-green px-4 text-sm font-bold text-white transition hover:opacity-90"
        >
          {showForm ? <X size={17} /> : <Plus size={17} />}
          {showForm ? "Cancel" : "Add activity"}
        </button>
      </div>

      {successMessage && (
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-brand-green/20 bg-brand-green/5 px-4 py-3 text-sm font-semibold text-brand-green">
          <CheckCircle2 size={17} />
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400">
          {errorMessage}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-2xl border border-border bg-background p-5 sm:p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="activityType"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Activity
              </label>

              <select
                id="activityType"
                name="activityType"
                required
                className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
              >
                <option value="">Select activity</option>

                {activityTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="activityDate"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Activity date
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted"
                />

                <input
                  id="activityDate"
                  name="activityDate"
                  type="date"
                  required
                  defaultValue={
                    new Date().toISOString().split("T")[0]
                  }
                  className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Description
              </label>

              <input
                id="description"
                name="description"
                type="text"
                placeholder="e.g. First irrigation after sowing"
                className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
              />
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Quantity
              </label>

              <input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 20"
                className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
              />
            </div>

            <div>
              <label
                htmlFor="unit"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Unit
              </label>

              <input
                id="unit"
                name="unit"
                type="text"
                placeholder="e.g. kg, litre, acre"
                className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
              />
            </div>

            <div>
              <label
                htmlFor="cost"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Cost (₹)
              </label>

              <input
                id="cost"
                name="cost"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 500"
                className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
              />
            </div>

            <div>
              <label
                htmlFor="notes"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Notes
              </label>

              <input
                id="notes"
                name="notes"
                type="text"
                placeholder="Optional notes"
                className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition placeholder:text-foreground-muted/60 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSaving && (
              <Loader2
                size={17}
                className="animate-spin"
              />
            )}

            {isSaving ? "Saving..." : "Save activity"}
          </button>
        </form>
      )}

      <div className="mt-7">
        {isLoading ? (
          <div className="flex items-center justify-center rounded-xl border border-dashed border-border p-8 text-sm text-foreground-muted">
            Loading activities...
          </div>
        ) : activities.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-background p-7 text-center">
            <Tractor
              size={25}
              className="mx-auto text-foreground-muted"
            />

            <p className="mt-3 text-sm font-semibold text-foreground">
              No activities recorded yet
            </p>

            <p className="mt-1 text-xs text-foreground-muted">
              Add your first farming activity for this crop.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="rounded-xl border border-border bg-background p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                        {activity.activity_type ===
                        "Irrigation" ? (
                          <Droplets size={17} />
                        ) : (
                          <Sprout size={17} />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-bold text-foreground">
                          {activity.activity_type}
                        </p>

                        <p className="text-xs text-foreground-muted">
                          {activity.activity_date}
                        </p>
                      </div>
                    </div>

                    {activity.description && (
                      <p className="mt-3 text-sm text-foreground-muted">
                        {activity.description}
                      </p>
                    )}
                  </div>

                  <div className="text-left sm:text-right">
                    {activity.quantity !== null && (
                      <p className="text-sm font-semibold text-foreground">
                        {activity.quantity}{" "}
                        {activity.unit ?? ""}
                      </p>
                    )}

                    {activity.cost !== null && (
                      <p className="mt-1 text-xs text-foreground-muted">
                        Cost: ₹{activity.cost}
                      </p>
                    )}
                  </div>
                </div>

                {activity.notes && (
                  <p className="mt-3 border-t border-border pt-3 text-xs text-foreground-muted">
                    Note: {activity.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}