"use client";

import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import {
  Camera,
  CheckCircle2,
  ImagePlus,
  Loader2,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface CropDoctorProps {
  cropCycleId: string;
}

export function CropDoctor({ cropCycleId }: CropDoctorProps) {
  const supabase = createClient();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("Image must be smaller than 10 MB.");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const objectUrl = URL.createObjectURL(file);

    setImage(file);
    setPreview(objectUrl);
    setAnalyzed(false);
    setErrorMessage(null);
  };

  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview(null);
    setAnalyzed(false);
    setErrorMessage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (cameraInputRef.current) {
      cameraInputRef.current.value = "";
    }
  };

  const analyzeImage = async () => {
    if (!image || analyzing) return;

    if (!cropCycleId) {
    setErrorMessage("Crop cycle ID is missing. Please reopen this crop.");
    return;
    }

    setAnalyzing(true);
    setAnalyzed(false);
    setErrorMessage(null);

    let diagnosisId: string | null = null;
    let storagePath: string | null = null;

    try {
      // --------------------------------------------------------
      // 1. Get the currently authenticated farmer
      // --------------------------------------------------------
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Your session has expired. Please sign in again.");
      }

      // --------------------------------------------------------
      // 2. Find the farmer profile
      // --------------------------------------------------------
      const { data: farmerProfile, error: profileError } = await supabase
        .from("farmer_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (profileError || !farmerProfile) {
        throw new Error(
          "Farmer profile not found. Please complete your profile first.",
        );
      }

      // --------------------------------------------------------
      // 3. Create the diagnosis record
      // --------------------------------------------------------
      const { data: diagnosis, error: diagnosisError } = await supabase
        .from("crop_diagnoses")
        .insert({
          farmer_id: farmerProfile.id,
          crop_cycle_id: cropCycleId,
          diagnosis_type: "crop",
          ai_model: "pending",
        })
        .select("id")
        .single();

      if (diagnosisError || !diagnosis) {
        throw new Error(
          diagnosisError?.message || "Unable to create diagnosis record.",
        );
      }

      diagnosisId = diagnosis.id;

      // --------------------------------------------------------
      // 4. Create the private Storage path
      // --------------------------------------------------------
      const fileExtension =
        image.name.split(".").pop()?.toLowerCase() || "jpg";

      storagePath = `${user.id}/${diagnosis.id}/image.${fileExtension}`;

      // --------------------------------------------------------
      // 5. Upload image to Supabase Storage
      // --------------------------------------------------------
      const { error: uploadError } = await supabase.storage
        .from("crop-diagnoses")
        .upload(storagePath, image, {
          contentType: image.type,
          upsert: false,
        });

      if (uploadError) {
        throw new Error(
          `Image upload failed: ${uploadError.message}`,
        );
      }

      // --------------------------------------------------------
      // 6. Save the Storage path in diagnosis_images
      // --------------------------------------------------------
      const { error: imageRecordError } = await supabase
        .from("diagnosis_images")
        .insert({
          diagnosis_id: diagnosis.id,
          image_url: storagePath,
          image_type: "original",
        });

      if (imageRecordError) {
        throw new Error(
          `Image record could not be saved: ${imageRecordError.message}`,
        );
      }

      // --------------------------------------------------------
      // 7. Temporary result
      // --------------------------------------------------------
      setAnalyzed(true);
    } catch (error) {
      console.error("Crop Doctor error:", error);

      // Clean up uploaded file if database operation failed
      if (storagePath) {
        await supabase.storage
          .from("crop-diagnoses")
          .remove([storagePath]);
      }

      // Clean up diagnosis record if we created one
      if (diagnosisId) {
        await supabase
          .from("crop_diagnoses")
          .delete()
          .eq("id", diagnosisId);
      }

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving the diagnosis.",
      );
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <section className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green">
            <ScanSearch size={22} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-xl font-semibold text-foreground">
                AI Crop & Produce Doctor
              </h2>

              <span className="inline-flex items-center gap-1 rounded-full bg-brand-lime/15 px-2.5 py-1 text-xs font-semibold text-brand-green">
                <Sparkles size={12} />
                AI Powered
              </span>
            </div>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-foreground-muted">
              Upload a photo of your crop or harvested produce and let
              SAHAYAAK assess its condition and suggest the next step.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-foreground-muted">
          <ShieldCheck size={16} className="text-brand-green" />
          Private & secure
        </div>
      </div>

      {/* Upload area */}
      {!preview ? (
        <div className="rounded-3xl border-2 border-dashed border-border bg-background/60 p-6 sm:p-10">
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-green/10 text-brand-green">
              <ImagePlus size={30} />
            </div>

            <h3 className="text-lg font-semibold text-foreground">
              Show us the crop or produce
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-foreground-muted">
              Upload an existing photo or use your camera to take a new one.
              Clear, well-lit photos give better results.
            </p>

            <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green/90"
              >
                <Upload size={18} />
                Upload image
              </button>

              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition hover:border-brand-green hover:text-brand-green"
              >
                <Camera size={18} />
                Take photo
              </button>
            </div>

            <p className="mt-4 text-xs text-foreground-muted">
              Supported image formats: JPG, JPEG, PNG, WEBP · Maximum 10 MB
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          {/* Image preview */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-black">
            <div className="relative min-h-[280px] w-full lg:min-h-[520px]">
              <Image
                src={preview}
                alt="Selected crop or produce"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={removeImage}
              aria-label="Remove image"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
            >
              <X size={19} />
            </button>
          </div>

          {/* Analysis panel */}
          <div className="flex flex-col rounded-3xl border border-border bg-background p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">
                Crop Doctor
              </p>

              <h3 className="mt-2 text-lg font-semibold text-foreground">
                Ready to analyze
              </h3>

              <p className="mt-2 text-sm leading-6 text-foreground-muted">
                SAHAYAAK will securely save the image and create a diagnosis
                record for the AI assessment pipeline.
              </p>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-3">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-brand-green"
                />

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Image received
                  </p>

                  <p className="mt-0.5 break-all text-xs text-foreground-muted">
                    {image?.name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-3">
                <Sparkles
                  size={18}
                  className="mt-0.5 shrink-0 text-brand-lime"
                />

                <div>
                  <p className="text-sm font-medium text-foreground">
                    AI assessment
                  </p>

                  <p className="mt-0.5 text-xs text-foreground-muted">
                    Disease, pest, damage, weakness and quality assessment
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <button
                type="button"
                onClick={analyzeImage}
                disabled={analyzing}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-green/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {analyzing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving image...
                  </>
                ) : (
                  <>
                    <ScanSearch size={18} />
                    Analyze with AI
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {errorMessage && (
        <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            {errorMessage}
          </p>
        </div>
      )}

      {/* Success */}
      {analyzed && (
        <div className="mt-5 rounded-3xl border border-brand-green/20 bg-brand-green/5 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green text-white">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <p className="font-semibold text-foreground">
                Image saved successfully
              </p>

              <p className="mt-1 text-sm leading-6 text-foreground-muted">
                Your crop image has been securely stored and the diagnosis
                record has been created. The actual AI/CV diagnosis will be
                connected to this pipeline next.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageChange}
        className="hidden"
      />
    </section>
  );
}