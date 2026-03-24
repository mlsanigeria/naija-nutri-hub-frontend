"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Flame,
  Minus,
  Plus,
  Clock,
  Leaf,
  Apple,
  Search,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProfileDropdown } from "@/components/ui/profile-dropdown";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth";
import { axiosInstance } from "@/lib/axios";

interface NutritionFacts {
  calories: number;
  protein_g: number;
  fat_g: number;
  carbohydrates_g: number;
  fiber_g: number;
  sugar_g: number;
  cholesterol_mg: number;
  sodium_mg: number;
}

interface NutritionMetadata {
  category: string;
  area: string;
  origin: string;
  main_ingredient: string;
  dietary_tags: string[];
}

interface NutritionData {
  food_name: string;
  servings: string;
  portion_size: string;
  nutrition_facts: NutritionFacts;
  sources: {
    dataset: boolean;
    mealdb: boolean;
    spoonacular: boolean;
  };
  metadata: NutritionMetadata;
}

// Daily values for calculating percentages (based on 2000 calorie diet)
const DAILY_VALUES = {
  calories: 2000,
  protein_g: 50,
  fat_g: 65,
  carbohydrates_g: 300,
  fiber_g: 25,
  sugar_g: 50,
  cholesterol_mg: 300,
  sodium_mg: 2400,
};

function NutritionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  const foodNameFromUrl = searchParams.get("food") || "";
  const imageUrl = searchParams.get("image") || "";
  const portionFromUrl = searchParams.get("portion") || "";
  const extraFromUrl = searchParams.get("extra") || "";

  const [foodNameInput, setFoodNameInput] = useState(foodNameFromUrl);
  const [currentFoodName, setCurrentFoodName] = useState(foodNameFromUrl);
  const [portionSize, setPortionSize] = useState(
    portionFromUrl ? parseInt(portionFromUrl) || 1 : 1,
  );
  const [extraInputs, setExtraInputs] = useState(extraFromUrl);
  const [nutrition, setNutrition] = useState<NutritionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [servingCount, setServingCount] = useState(
    portionFromUrl ? parseInt(portionFromUrl) || 1 : 1,
  );

  useEffect(() => {
    if (!hasHydrated) return;

    if (!user?.token) {
      toast.error("Please login to view nutritional information.");
      router.replace("/login");
      return;
    }

    // Pre-fill food name from URL
    if (foodNameFromUrl) {
      setFoodNameInput(foodNameFromUrl);
      setCurrentFoodName(foodNameFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated, user?.token, foodNameFromUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodNameInput.trim()) {
      toast.error("Please enter a food name");
      return;
    }
    setCurrentFoodName(foodNameInput.trim());
    fetchNutrition(
      foodNameInput.trim(),
      portionSize.toString(),
      extraInputs.trim() || undefined,
    );
  };

  const fetchNutrition = async (
    foodName: string,
    portion?: string,
    extra?: string,
  ) => {
    if (!user?.email) {
      toast.error("Email not found. Please login again.");
      router.replace("/login");
      return;
    }

    setLoading(true);
    try {
      const payload: Record<string, string | undefined> = {
        email: user.email,
        food_name: foodName,
      };
      if (portion) payload.portion_size = portion;
      if (extra) payload.extra_inputs = extra;

      const response = await axiosInstance.post(
        "/features/nutritional_estimates",
        payload,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      const data = response.data?.nutritional_estimate;
      if (data) {
        setNutrition(data);
      }
    } catch (error) {
      console.error("Nutrition fetch error:", error);
      toast.error("Failed to fetch nutritional information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getDailyValuePercent = (
    value: number,
    nutrient: keyof typeof DAILY_VALUES,
  ) => {
    const adjusted = value * servingCount;
    return Math.round((adjusted / DAILY_VALUES[nutrient]) * 100);
  };

  const getAdjustedValue = (value: number) => {
    return Math.round(value * servingCount);
  };

  // Handle back navigation
  const handleBack = () => {
    router.back();
  };

  // Show search form if no nutrition loaded yet
  if (!nutrition && !loading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <div className="px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <ProfileDropdown />
        </div>

        {/* Content */}
        <div className="px-4 pt-4 pb-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Apple className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">
              Nutritional Estimates
            </h1>
            <p className="text-sm text-muted-foreground">
              Get detailed nutritional breakdown for any Nigerian dish
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Food Name Input */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Food Name
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={foodNameInput}
                  onChange={(e) => setFoodNameInput(e.target.value)}
                  placeholder="e.g., Jollof Rice, Egusi Soup..."
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Servings Selector */}
            <div>
              <label className="block text-sm font-medium mb-2">Servings</label>
              <div className="flex items-center gap-4 bg-card border border-border rounded-xl px-4 py-3">
                <Scale className="w-5 h-5 text-muted-foreground" />
                <span className="flex-1">Number of servings</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPortionSize(Math.max(1, portionSize - 1))}
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </button>
                  <span className="w-6 text-center font-medium">
                    {portionSize}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPortionSize(portionSize + 1)}
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Extra Inputs */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Additional Info{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </label>
              <textarea
                value={extraInputs}
                onChange={(e) => setExtraInputs(e.target.value)}
                placeholder="Any specific details? e.g., 'cooked with palm oil', 'without sugar', 'with extra meat'..."
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium rounded-xl"
              disabled={!hasHydrated}
            >
              {!hasHydrated ? "Loading..." : "Get Nutritional Info"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Or{" "}
            <Link
              href="/image-request"
              className="text-primary hover:underline"
            >
              scan a food image
            </Link>{" "}
            to identify it first
          </p>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <Image
            src="/images/logo.png"
            alt="Naija Nutri Hub"
            width={64}
            height={64}
            className="w-16 h-16 mx-auto mb-4 rounded-full animate-pulse"
          />
          <p className="text-muted-foreground">
            Loading nutritional info for {currentFoodName}...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Image */}
      <div className="relative h-56 w-full">
        {imageUrl ? (
          <Image
            src={decodeURIComponent(imageUrl)}
            alt={currentFoodName}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
            <span className="text-6xl">🍲</span>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => setNutrition(null)}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* Profile Button */}
        <div className="absolute top-4 right-4">
          <ProfileDropdown />
        </div>

        {/* Food Name & Tags Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 pt-16">
          <h1 className="text-2xl font-bold text-white mb-2">
            {nutrition?.food_name || currentFoodName}
          </h1>
          {/* Tags */}
          {nutrition?.metadata && (
            <div className="flex flex-wrap gap-2">
              {nutrition.metadata.area && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                  {nutrition.metadata.area}
                </span>
              )}
              {nutrition.metadata.origin &&
                nutrition.metadata.origin !== nutrition.metadata.area && (
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                    {nutrition.metadata.origin}
                  </span>
                )}
              {nutrition.metadata.category && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                  {nutrition.metadata.category}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5">
        {/* Section Title */}
        <h2 className="text-lg font-semibold mb-4">Nutritional value</h2>

        {/* Quick Info Card */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-5">
          <div className="grid grid-cols-4 gap-3">
            {/* Servings with +/- */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Servings</p>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setServingCount(Math.max(1, servingCount - 1))}
                  className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-semibold text-lg w-4 text-center">
                  {servingCount}
                </span>
                <button
                  onClick={() => setServingCount(servingCount + 1)}
                  className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Prep Time */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Prep Time</p>
              <div className="flex items-center justify-center gap-1">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="font-semibold">15m</span>
              </div>
            </div>

            {/* Cook Time */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Cook Time</p>
              <div className="flex items-center justify-center gap-1">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="font-semibold">45m</span>
              </div>
            </div>

            {/* Spice Level */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Spice Level</p>
              <div className="flex items-center justify-center gap-1">
                <Leaf className="w-4 h-4 text-orange-500" />
                <span className="font-semibold">Medium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition Cards Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Calories Card */}
          <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Flame className="w-4 h-4 text-orange-500" />
              </div>
              <span className="text-sm font-medium">Calories</span>
            </div>
            <p className="text-2xl font-bold mb-1">
              {getAdjustedValue(nutrition?.nutrition_facts?.calories || 0)}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                cal
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              {getDailyValuePercent(
                nutrition?.nutrition_facts?.calories || 0,
                "calories",
              )}
              % of daily value
            </p>
          </div>

          {/* Protein Card */}
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-red-500 text-sm font-bold">P</span>
              </div>
              <span className="text-sm font-medium">Protein</span>
            </div>
            <p className="text-2xl font-bold mb-1">
              {getAdjustedValue(nutrition?.nutrition_facts?.protein_g || 0)}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                g
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              {getDailyValuePercent(
                nutrition?.nutrition_facts?.protein_g || 0,
                "protein_g",
              )}
              % of daily value
            </p>
          </div>

          {/* Carbs Card */}
          <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900/50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <span className="text-yellow-600 text-sm font-bold">C</span>
              </div>
              <span className="text-sm font-medium">Carbs</span>
            </div>
            <p className="text-2xl font-bold mb-1">
              {getAdjustedValue(
                nutrition?.nutrition_facts?.carbohydrates_g || 0,
              )}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                g
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              {getDailyValuePercent(
                nutrition?.nutrition_facts?.carbohydrates_g || 0,
                "carbohydrates_g",
              )}
              % of daily value
            </p>
          </div>

          {/* Fat Card */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-500 text-sm font-bold">F</span>
              </div>
              <span className="text-sm font-medium">Fat</span>
            </div>
            <p className="text-2xl font-bold mb-1">
              {getAdjustedValue(nutrition?.nutrition_facts?.fat_g || 0)}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                g
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              {getDailyValuePercent(
                nutrition?.nutrition_facts?.fat_g || 0,
                "fat_g",
              )}
              % of daily value
            </p>
          </div>
        </div>

        {/* Additional Nutrients */}
        {nutrition?.nutrition_facts && (
          <div className="bg-card border border-border rounded-2xl mb-5">
            <h3 className="font-semibold px-4 pt-4 pb-2">More Nutrients</h3>
            <div className="divide-y divide-border">
              <div className="flex justify-between items-center px-4 py-3">
                <span className="text-sm">Fiber</span>
                <span className="font-medium">
                  {getAdjustedValue(nutrition.nutrition_facts.fiber_g)}g
                </span>
              </div>
              <div className="flex justify-between items-center px-4 py-3">
                <span className="text-sm">Sugar</span>
                <span className="font-medium">
                  {getAdjustedValue(nutrition.nutrition_facts.sugar_g)}g
                </span>
              </div>
              <div className="flex justify-between items-center px-4 py-3">
                <span className="text-sm">Cholesterol</span>
                <span className="font-medium">
                  {getAdjustedValue(nutrition.nutrition_facts.cholesterol_mg)}mg
                </span>
              </div>
              <div className="flex justify-between items-center px-4 py-3">
                <span className="text-sm">Sodium</span>
                <span className="font-medium">
                  {getAdjustedValue(nutrition.nutrition_facts.sodium_mg)}mg
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Dietary Tags */}
        {nutrition?.metadata?.dietary_tags &&
          nutrition.metadata.dietary_tags.length > 0 && (
            <div className="mb-5">
              <h3 className="font-semibold mb-3">Dietary Info</h3>
              <div className="flex flex-wrap gap-2">
                {nutrition.metadata.dietary_tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Action Button */}
        <div className="pb-6">
          <Button
            onClick={() => {
              const params = new URLSearchParams({
                food: currentFoodName,
                image: imageUrl,
              });
              router.push(`/recipe?${params.toString()}`);
            }}
            className="w-full h-12 text-base font-medium rounded-xl bg-primary hover:bg-primary/90"
          >
            View Recipe
          </Button>
        </div>
      </div>
    </main>
  );
}

export default function NutritionPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </main>
      }
    >
      <NutritionContent />
    </Suspense>
  );
}
