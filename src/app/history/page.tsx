"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, Apple, ChefHat, Loader2 } from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { axiosInstance } from "@/lib/axios";
import { ProfileDropdown } from "@/components/ui/profile-dropdown";
import { toast } from "sonner";

// History item types based on actual backend API response
type FeatureName =
  | "food_classification"
  | "nutritional_estimates"
  | "recipe_generation";

interface HistoryItem {
  email: string;
  feature_name: FeatureName;
  timestamp: string;
  // For recipe_generation
  food_name?: string;
  servings?: number;
  dietary_restriction?: string[];
  extra_inputs?: string | null;
  // For nutritional_estimates
  portion_size?: string;
  created_at?: string;
  // For food_classification
  content_type?: string;
  image_download_id?: string;
}

// Format date for display
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// Get icon, label and feature display name based on feature_name
// Colors match the landing page feature cards
function getHistoryMeta(featureName: FeatureName) {
  switch (featureName) {
    case "food_classification":
      return {
        icon: Camera,
        featureLabel: "Food Classification",
        color: "text-orange-500",
        bgColor: "bg-gradient-to-br from-orange-500/20 to-orange-600/10",
        borderColor: "border-orange-500/30",
      };
    case "nutritional_estimates":
      return {
        icon: Apple,
        featureLabel: "Nutritional Estimates",
        color: "text-green-500",
        bgColor: "bg-gradient-to-br from-green-500/20 to-green-600/10",
        borderColor: "border-green-500/30",
      };
    case "recipe_generation":
      return {
        icon: ChefHat,
        featureLabel: "Recipe Generation",
        color: "text-purple-500",
        bgColor: "bg-gradient-to-br from-purple-500/20 to-purple-600/10",
        borderColor: "border-purple-500/30",
      };
    default:
      return {
        icon: Camera,
        featureLabel: "Feature",
        color: "text-primary",
        bgColor: "bg-primary/10",
        borderColor: "border-primary/30",
      };
  }
}

export default function HistoryPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasHydrated) return;

    const fetchHistory = async () => {
      if (!user?.token) {
        router.push("/login");
        return;
      }

      try {
        const response = await axiosInstance.get("/users/history", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        // API returns { message: string, history: HistoryItem[] }
        const historyData = response.data.history || [];
        setHistory(Array.isArray(historyData) ? historyData : []);
      } catch (error) {
        console.error("Failed to fetch history:", error);
        toast.error("Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user?.token, router, hasHydrated]);

  // Handle clicking a history item
  const handleHistoryClick = (item: HistoryItem) => {
    const { feature_name } = item;

    switch (feature_name) {
      case "food_classification": {
        // For classification, store the image_download_id and navigate to upload-image page
        // This reuses the same flow as the original scan/upload experience
        if (item.image_download_id) {
          sessionStorage.setItem(
            "history_classification",
            JSON.stringify({
              image_download_id: item.image_download_id,
              content_type: item.content_type,
              fromHistory: true,
            }),
          );
          router.push("/upload-image?fromHistory=true");
        } else {
          toast.info("Navigate to scan/upload to classify again");
          router.push("/upload-image");
        }
        break;
      }
      case "nutritional_estimates": {
        const params = new URLSearchParams();
        if (item.food_name) params.set("food", item.food_name);
        if (item.portion_size) params.set("portion", item.portion_size);
        if (item.extra_inputs) params.set("extra", item.extra_inputs);
        router.push(`/nutrition?${params.toString()}`);
        break;
      }
      case "recipe_generation": {
        const params = new URLSearchParams();
        if (item.food_name) params.set("food", item.food_name);
        if (item.servings) params.set("servings", String(item.servings));
        // dietary_restriction is an array, take the first one
        if (item.dietary_restriction && item.dietary_restriction.length > 0) {
          params.set("dietary", item.dietary_restriction[0]);
        }
        if (item.extra_inputs) params.set("extra", item.extra_inputs);
        router.push(`/recipe?${params.toString()}`);
        break;
      }
    }
  };

  if (!hasHydrated || loading) {
    return (
      <main className="min-h-screen bg-background text-foreground px-4 py-6 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">History</h1>
        </div>
        <ProfileDropdown />
      </div>

      {history.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-muted-foreground text-center">
            No history yet.
            <br />
            Start scanning food images to see your history here.
          </p>
        </div>
      ) : (
        /* Timeline */
        <div className="bg-card rounded-2xl p-4">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-primary" />

            {/* History items */}
            <div className="space-y-4">
              {history.map((item, index) => {
                const meta = getHistoryMeta(item.feature_name);
                const Icon = meta.icon;

                return (
                  <button
                    key={`${item.timestamp}-${index}`}
                    onClick={() => handleHistoryClick(item)}
                    className="flex items-start gap-4 w-full text-left hover:bg-secondary/50 rounded-lg p-2 -ml-2 transition-colors"
                  >
                    {/* Timeline dot */}
                    <div className="relative z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-background" />
                    </div>

                    {/* Content with Feature Icon Card */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-2">
                        {formatDate(item.timestamp)}
                      </p>

                      {/* Feature Card */}
                      <div
                        className={`flex items-center gap-3 p-3 rounded-xl border ${meta.bgColor} ${meta.borderColor}`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full ${meta.bgColor} flex items-center justify-center flex-shrink-0`}
                        >
                          <Icon className={`w-5 h-5 ${meta.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold ${meta.color}`}>
                            {meta.featureLabel}
                          </p>
                          {item.food_name && (
                            <p className="text-xs text-muted-foreground truncate">
                              {item.food_name}
                            </p>
                          )}
                          {item.feature_name === "food_classification" &&
                            !item.food_name && (
                              <p className="text-xs text-muted-foreground">
                                Tap to view &amp; re-scan
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
