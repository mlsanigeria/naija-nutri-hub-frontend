"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Clock,
  Users,
  Flame,
  Plus,
  Minus,
  Check,
  ChevronDown,
  Search,
  ChefHat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProfileDropdown } from "@/components/ui/profile-dropdown";
import { useAuthStore } from "@/stores/auth";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

interface RecipeIngredient {
  name: string;
  quantity: string;
  notes?: string;
}

interface RecipeStep {
  step_number: number;
  instruction: string;
  image_url?: string | null;
}

interface RecipeData {
  food_name: string;
  description: string;
  region: string;
  spice_level: string;
  servings: number;
  prep_time_minutes: string;
  cook_time_minutes: string;
  total_time_minutes: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  dietary_restrictions?: string[];
  source?: string;
}

const DIETARY_OPTIONS = [
  "None",
  "Vegetarian",
  "Vegan",
  "Lactose intolerant",
  "Gluten-free",
  "Nut allergy",
  "Diabetic",
  "Halal",
];

function RecipeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  const foodNameFromUrl = searchParams.get("food") || "";
  const imageUrl = searchParams.get("image") || "";
  const servingsFromUrl = searchParams.get("servings") || "";
  const dietaryFromUrl = searchParams.get("dietary") || "";
  const extraFromUrl = searchParams.get("extra") || "";

  const [foodNameInput, setFoodNameInput] = useState(foodNameFromUrl);
  const [currentFoodName, setCurrentFoodName] = useState(foodNameFromUrl);
  const [servings, setServings] = useState(
    servingsFromUrl ? parseInt(servingsFromUrl) || 1 : 1,
  );
  const [dietaryRestriction, setDietaryRestriction] = useState(
    dietaryFromUrl && DIETARY_OPTIONS.includes(dietaryFromUrl)
      ? dietaryFromUrl
      : "None",
  );
  const [extraInputs, setExtraInputs] = useState(extraFromUrl);
  const [showDietaryDropdown, setShowDietaryDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<"ingredients" | "instructions">(
    "ingredients",
  );
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(
    new Set(),
  );
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<RecipeData | null>(null);

  useEffect(() => {
    if (!hasHydrated) return;

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
    generateRecipe(foodNameInput.trim());
  };

  const generateRecipe = async (foodName: string) => {
    if (!hasHydrated) {
      // Wait for hydration to complete
      return;
    }
    if (!user?.token || !user?.email) {
      toast.error("Please log in to generate recipes");
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        email: user.email,
        food_name: foodName,
        servings: servings > 0 ? servings : null,
        dietary_restriction:
          dietaryRestriction !== "None" ? [dietaryRestriction] : null,
        extra_inputs: extraInputs.trim() || null,
      };

      const response = await axiosInstance.post(
        "/features/recipe_generation",
        payload,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        },
      );

      // Parse the response from generated_recipe object
      const data = response.data;
      const recipe = data.generated_recipe;

      if (!recipe) {
        toast.error("No recipe data received");
        return;
      }

      setRecipe({
        food_name: recipe.food_name || foodName,
        description: recipe.description || "",
        region: recipe.region || "Nigerian",
        spice_level: recipe.spice_level || "Medium",
        servings: recipe.servings || servings,
        prep_time_minutes: recipe.prep_time_minutes || "15",
        cook_time_minutes: recipe.cook_time_minutes || "30",
        total_time_minutes: recipe.total_time_minutes || "45",
        ingredients: recipe.ingredients || [],
        steps: recipe.steps || [],
        dietary_restrictions: recipe.dietary_restrictions,
        source: recipe.source,
      });
    } catch (error) {
      console.error("Recipe generation error:", error);
      toast.error("Failed to generate recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
  };

  const handleRegenerateRecipe = () => {
    generateRecipe(currentFoodName);
  };

  // Handle back navigation
  const handleBack = () => {
    router.back();
  };

  // Show search form if no recipe loaded yet
  if (!recipe && !loading) {
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
              <ChefHat className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">Recipe Generation</h1>
            <p className="text-sm text-muted-foreground">
              Generate a detailed recipe with ingredients and instructions
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Food Name */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Food Name *
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="e.g., Jollof Rice, Egusi Soup..."
                  value={foodNameInput}
                  onChange={(e) => setFoodNameInput(e.target.value)}
                  className="pl-12 h-12 text-base rounded-xl"
                />
              </div>
            </div>

            {/* Servings */}
            <div>
              <label className="text-sm font-medium mb-2 block">Servings</label>
              <div className="flex items-center gap-4 bg-card border border-border rounded-xl px-4 py-3">
                <Users className="w-5 h-5 text-muted-foreground" />
                <span className="flex-1">Number of servings</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </button>
                  <span className="w-6 text-center font-medium">
                    {servings}
                  </span>
                  <button
                    type="button"
                    onClick={() => setServings(servings + 1)}
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Dietary Restriction */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Dietary Restriction
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowDietaryDropdown(!showDietaryDropdown)}
                  className="w-full flex items-center justify-between bg-card border border-border rounded-xl px-4 py-3 text-left"
                >
                  <span
                    className={
                      dietaryRestriction === "None"
                        ? "text-muted-foreground"
                        : ""
                    }
                  >
                    {dietaryRestriction === "None"
                      ? "Select dietary restriction (optional)"
                      : dietaryRestriction}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${showDietaryDropdown ? "rotate-180" : ""}`}
                  />
                </button>
                {showDietaryDropdown && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-card border border-border rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                    {DIETARY_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setDietaryRestriction(option);
                          setShowDietaryDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary first:rounded-t-xl last:rounded-b-xl ${
                          dietaryRestriction === option
                            ? "bg-primary/10 text-primary"
                            : ""
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Extra Inputs */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Extra Instructions
              </label>
              <textarea
                placeholder="Any special requests? e.g., 'less oil', 'spicier', 'substitute palm oil'..."
                value={extraInputs}
                onChange={(e) => setExtraInputs(e.target.value)}
                rows={3}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <Button
              type="submit"
              disabled={!hasHydrated || loading}
              className="w-full h-12 text-base font-medium rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50"
            >
              {!hasHydrated ? "Loading..." : "Generate Recipe"}
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
            Generating recipe for {currentFoodName}...
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
          <img
            src={decodeURIComponent(imageUrl)}
            alt={currentFoodName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
            <span className="text-4xl">🍲</span>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => setRecipe(null)}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* Profile Button */}
        <div className="absolute top-4 right-4">
          <ProfileDropdown />
        </div>

        {/* Food Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
          <h1 className="text-2xl font-semibold text-white mb-2">
            {recipe?.food_name || currentFoodName}
          </h1>
          <div className="flex gap-2 flex-wrap">
            {recipe?.region && (
              <span className="px-3 py-1 bg-primary/80 text-white text-xs rounded-full">
                {recipe.region}
              </span>
            )}
            {recipe?.dietary_restrictions?.map((restriction, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-green-600/80 text-white text-xs rounded-full"
              >
                {restriction}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {/* Description */}
        {recipe?.description && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {recipe.description}
          </p>
        )}

        {/* Quick Info Card */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-4">
          <h3 className="font-semibold mb-4">Quick Info</h3>

          {/* Servings */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-muted-foreground" />
              <span>Servings</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="w-7 h-7 rounded-full bg-primary flex items-center justify-center"
              >
                <Minus className="w-4 h-4 text-white" />
              </button>
              <span className="w-6 text-center">{servings}</span>
              <button
                onClick={() => setServings(servings + 1)}
                className="w-7 h-7 rounded-full bg-primary flex items-center justify-center"
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Prep Time */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <span>Prep Time</span>
            </div>
            <span>
              {recipe?.prep_time_minutes
                ? `${recipe.prep_time_minutes} min`
                : "15 min"}
            </span>
          </div>

          {/* Cook Time */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <span>Cook Time</span>
            </div>
            <span>
              {recipe?.cook_time_minutes
                ? `${recipe.cook_time_minutes} min`
                : "30 min"}
            </span>
          </div>

          {/* Spice Level */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Flame className="w-5 h-5 text-muted-foreground" />
              <span>Spice Level</span>
            </div>
            <span>{recipe?.spice_level || "Spicy"}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-4">
          <button
            onClick={() => setActiveTab("ingredients")}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "ingredients"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
            }`}
          >
            Ingredients
          </button>
          <button
            onClick={() => setActiveTab("instructions")}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "instructions"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
            }`}
          >
            Instructions
          </button>
        </div>

        {/* Tab Content */}
        <div className="mb-6">
          {activeTab === "ingredients" && (
            <div className="space-y-3">
              {recipe?.ingredients && recipe.ingredients.length > 0 ? (
                recipe.ingredients.map((ingredient, index) => (
                  <button
                    key={index}
                    onClick={() => toggleIngredient(index)}
                    className="w-full flex items-start gap-3 text-left"
                  >
                    <div
                      className={`w-5 h-5 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center ${
                        checkedIngredients.has(index)
                          ? "bg-primary border-primary"
                          : "border-border"
                      }`}
                    >
                      {checkedIngredients.has(index) && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{ingredient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {ingredient.quantity}
                        {ingredient.notes ? ` • ${ingredient.notes}` : ""}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No ingredients available. Try regenerating the recipe.
                </p>
              )}
            </div>
          )}

          {activeTab === "instructions" && (
            <div className="space-y-4">
              {recipe?.steps && recipe.steps.length > 0 ? (
                recipe.steps.map((step) => (
                  <div key={step.step_number} className="space-y-2">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-xs font-medium">
                        {step.step_number}
                      </div>
                      <p className="text-sm leading-relaxed pt-0.5">
                        {step.instruction}
                      </p>
                    </div>
                    {/* Step Image */}
                    {step.image_url ? (
                      <div className="ml-9 rounded-xl overflow-hidden bg-secondary">
                        <Image
                          src={step.image_url}
                          alt={`Step ${step.step_number}`}
                          width={400}
                          height={200}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    ) : (
                      <div className="ml-9 rounded-xl bg-secondary/50 border border-dashed border-border h-24 flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">
                          No image for this step
                        </span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No instructions available. Try regenerating the recipe.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <Button
            onClick={handleRegenerateRecipe}
            variant="outline"
            className="w-full h-12 text-base font-medium rounded-xl border-border"
          >
            Regenerate Recipe
          </Button>
          <Link
            href={`/nutrition?food=${encodeURIComponent(currentFoodName)}&image=${encodeURIComponent(imageUrl)}`}
            className="block"
          >
            <Button className="w-full h-12 text-base font-medium rounded-xl bg-primary hover:bg-primary/90">
              View Nutritional Estimates
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function RecipePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </main>
      }
    >
      <RecipeContent />
    </Suspense>
  );
}
