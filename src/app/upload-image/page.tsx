"use client";

import { ArrowLeft, Upload, Loader2, X } from "lucide-react";
import { useState, useEffect, useRef, DragEvent, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { ScannedImagePreview } from "@/components/features/scan-image/result-preview";
import { Button } from "@/components/ui/button";
import { ProfileDropdown } from "@/components/ui/profile-dropdown";
import { toast } from "sonner";

interface IClassificationResult {
  food_name: string;
  description: string;
  origin: string;
  spice_level: string;
  main_ingredients: string[];
  source: string;
  image: Blob | string;
}

interface HistoryClassificationData {
  image_download_id: string;
  content_type?: string;
  fromHistory?: boolean;
}

function UploadImageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAuthStore((s) => s.user);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IClassificationResult | null>(null);
  const fromHistory = searchParams.get("fromHistory") === "true";
  const processedRef = useRef(false);

  // Load image from history if navigating from history page
  useEffect(() => {
    if (!hasHydrated || !fromHistory || processedRef.current) return;
    if (!user?.token) return;

    const storedData = sessionStorage.getItem("history_classification");
    if (!storedData) return;

    const loadHistoryImage = async () => {
      setLoadingHistory(true);
      try {
        const data: HistoryClassificationData = JSON.parse(storedData);

        if (!data.image_download_id) {
          toast.error("No image ID found");
          return;
        }

        // Fetch the image from API
        const response = await axiosInstance.get(
          `/features/food_classification/image/${data.image_download_id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            responseType: "blob",
          },
        );

        // Create blob and preview URL
        const blob = new Blob([response.data], {
          type: data.content_type || "image/jpeg",
        });
        const url = URL.createObjectURL(blob);

        // Convert blob to File for the scan function
        const extension =
          (data.content_type || "image/jpeg").split("/")[1] || "jpg";
        const file = new File([blob], `history_image.${extension}`, {
          type: data.content_type || "image/jpeg",
        });

        setSelectedImage(file);
        setPreviewUrl(url);

        // Clear sessionStorage after successful load
        sessionStorage.removeItem("history_classification");
        processedRef.current = true;
      } catch (err) {
        console.error("Failed to load history image:", err);
        toast.error("Failed to load image from history");
      } finally {
        setLoadingHistory(false);
      }
    };

    loadHistoryImage();
  }, [hasHydrated, fromHistory, user?.token]);

  function handleFile(file: File) {
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    } else {
      setError("Please select a valid image file.");
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function clearImage() {
    setSelectedImage(null);
    setPreviewUrl(null);
    setError(null);
  }

  async function scanImage() {
    if (!selectedImage) return;

    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await axiosInstance.post(
        "/features/food_classification",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const classificationResult: IClassificationResult = {
        ...response.data.classification_result,
        image: previewUrl,
      };
      setResult(classificationResult);
    } catch (err) {
      console.error("Image scanning error:", err);
      setError("Failed to scan image. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Handle back navigation
  const handleBack = () => {
    if (fromHistory) {
      router.back();
    } else {
      router.push("/image-request");
    }
  };

  // Show loading state when fetching/analyzing history image
  if (loadingHistory || (fromHistory && loading)) {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center p-5">
        <Image
          src="/images/logo.png"
          alt="Naija Nutri Hub"
          width={64}
          height={64}
          className="w-16 h-16 rounded-full animate-pulse"
        />
        <p className="mt-4 text-neutral-400">
          {loading ? "Analyzing image..." : "Loading image..."}
        </p>
      </div>
    );
  }

  // Show result view if classification completed
  if (result) {
    return <ScannedImagePreview {...result} />;
  }

  return (
    <div className="min-h-screen text-foreground flex flex-col items-center p-5 pt-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">
              {fromHistory ? "Previous Scan" : "Add photos & files"}
            </h1>
          </div>
          <ProfileDropdown />
        </div>

        {/* Upload Zone */}
        {!previewUrl ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl py-20 cursor-pointer transition-all ${
              isDragging
                ? "border-[#FF7A50] bg-[#FF7A50]/10"
                : "border-border hover:border-[#FF7A50]"
            }`}
          >
            <label htmlFor="fileUpload" className="cursor-pointer text-center">
              <Upload size={40} className="text-[#FF7A50] mb-4 mx-auto" />
              <p className="text-muted-foreground">
                Drag and drop an image here, or{" "}
                <span className="text-[#FF7A50]">browse files</span>
              </p>
              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        ) : (
          /* Preview with action buttons */
          <div className="space-y-4">
            <div className="relative w-full max-h-80 aspect-video">
              <Image
                src={previewUrl}
                alt="preview"
                fill
                className="rounded-xl object-cover border border-border"
                unoptimized
              />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 p-1 bg-black/60 rounded-full hover:bg-black/80 transition-colors"
                aria-label="Remove image"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={clearImage}
                variant="outline"
                className="flex-1"
                disabled={loading}
              >
                Choose Another
              </Button>
              <Button
                onClick={scanImage}
                className="flex-1 bg-[#FF7A50] hover:bg-[#FF7A50]/90 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  "Scan Image"
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-sm text-red-400 text-center">{error}</p>
        )}

        {/* Footer */}
        <p className="mt-10 text-sm text-muted-foreground max-w-full text-center">
          Scan a photo or upload an image to identify your food and its
          nutritional information.
        </p>
      </div>
    </div>
  );
}

export default function UploadImagePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF7A50]" />
        </div>
      }
    >
      <UploadImageContent />
    </Suspense>
  );
}
