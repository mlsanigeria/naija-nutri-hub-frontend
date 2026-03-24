"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { axiosInstance } from "@/lib/axios";
import { ScannedImagePreview } from "@/components/features/scan-image/result-preview";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Data structure from history page sessionStorage
interface HistoryClassificationData {
  image_download_id: string;
  content_type?: string;
  fromHistory?: boolean;
}

interface IClassificationResult {
  food_name: string;
  description: string;
  origin: string;
  spice_level: string;
  main_ingredients: string[];
  source: string;
  image: Blob | string;
}

export default function ClassificationResultPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  const [loading, setLoading] = useState(true);
  const [classifying, setClassifying] = useState(false);
  const [historyData, setHistoryData] =
    useState<HistoryClassificationData | null>(null);
  const [result, setResult] = useState<IClassificationResult | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  // Store the image_download_id in a ref to persist across strict mode re-renders
  const processedRef = React.useRef(false);
  const blobUrlRef = React.useRef<string | null>(null);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!user?.token) {
      router.push("/login");
      return;
    }

    // Prevent double-fetch in React Strict Mode
    if (processedRef.current) return;

    // Get data from sessionStorage (set by history page)
    const storedData = sessionStorage.getItem("history_classification");

    if (!storedData) {
      toast.error("No classification data found");
      router.push("/history");
      return;
    }

    const fetchImage = async (data: HistoryClassificationData) => {
      try {
        // Fetch the image using the image_download_id (request_id)
        const response = await axiosInstance.get(
          `/features/food_classification/image/${data.image_download_id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            responseType: "blob",
          },
        );

        // Create blob URL from response
        const blob = new Blob([response.data], {
          type: data.content_type || "image/jpeg",
        });
        const url = URL.createObjectURL(blob);
        blobUrlRef.current = url;
        setImageUrl(url);
        setImageBlob(blob);
        setHistoryData(data);

        // Clear sessionStorage only after successful fetch
        sessionStorage.removeItem("history_classification");
        processedRef.current = true;
      } catch (error) {
        console.error("Failed to fetch image:", error);
        toast.error("Failed to load image");
        router.push("/history");
      } finally {
        setLoading(false);
      }
    };

    try {
      const data: HistoryClassificationData = JSON.parse(storedData);

      if (data.image_download_id) {
        fetchImage(data);
      } else {
        toast.error("No image ID found");
        router.push("/history");
      }
    } catch (error) {
      console.error("Failed to parse classification data:", error);
      toast.error("Invalid classification data");
      router.push("/history");
      setLoading(false);
    }

    // Clean up blob URL on unmount
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, [hasHydrated, user?.token, router]);

  // Reclassify the image
  const handleReclassify = async () => {
    if (!imageBlob || !user?.token) return;

    setClassifying(true);
    try {
      const formData = new FormData();
      const extension = historyData?.content_type?.split("/")[1] || "jpg";
      formData.append("image", imageBlob, `image.${extension}`);

      const response = await axiosInstance.post(
        "/features/food_classification",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const classificationResult: IClassificationResult = {
        ...response.data.classification_result,
        image: imageUrl || "",
      };
      setResult(classificationResult);
      toast.success("Classification complete!");
    } catch (error) {
      console.error("Classification failed:", error);
      toast.error("Failed to classify image. Please try again.");
    } finally {
      setClassifying(false);
    }
  };

  if (!hasHydrated || loading) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </main>
    );
  }

  // If we have a result, show the classification preview
  if (result) {
    return <ScannedImagePreview {...result} />;
  }

  // Show the image preview with option to reclassify
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="absolute top-4 left-0 right-0 z-10 flex justify-between items-center px-4">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>
      </div>

      {/* Image Preview */}
      {imageUrl && (
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src={imageUrl}
            alt="Food to classify"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      {/* Content */}
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-2">Food Image</h1>
        <p className="text-muted-foreground mb-6">
          This image was previously scanned. Click below to analyze it again.
        </p>

        <Button
          onClick={handleReclassify}
          disabled={classifying || !imageBlob}
          className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl text-lg font-medium"
        >
          {classifying ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            "Analyze / Scan Again"
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          After analysis, you&apos;ll see the food details with options to view
          nutrition and recipes.
        </p>
      </div>
    </main>
  );
}
