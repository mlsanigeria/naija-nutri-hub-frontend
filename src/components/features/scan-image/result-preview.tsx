"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Store, Flame, ChevronDown } from "lucide-react";
import { ProfileDropdown } from "@/components/ui/profile-dropdown";

export const ScannedImagePreview = (data: {
  food_name: string;
  description: string;
  origin: string;
  spice_level: string;
  main_ingredients: string[];
  source: string;
  image: string | Blob;
}) => {
  const router = useRouter();
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);

  const handleRecipeClick = () => {
    const imageUrl =
      typeof data.image === "string"
        ? data.image
        : URL.createObjectURL(data.image);
    const params = new URLSearchParams({
      food: data.food_name,
      image: imageUrl,
    });
    router.push(`/recipe?${params.toString()}`);
  };

  const handleNutritionClick = () => {
    const imageUrl =
      typeof data.image === "string"
        ? data.image
        : URL.createObjectURL(data.image);
    const params = new URLSearchParams({
      food: data.food_name,
      image: imageUrl,
    });
    router.push(`/nutrition?${params.toString()}`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header with Back and Profile buttons */}
      <div className="absolute top-4 left-0 right-0 z-10 flex justify-between items-center px-4">
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>
        <ProfileDropdown />
      </div>

      {/* Food Image Hero Section */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={data.image}
          alt="Rebbit Visual on Pexels"
          className="w-full h-full object-cover"
          style={{ backgroundColor: "#BD843B" }}
        />
      </div>

      {/* Image Carousel Indicators */}
      {/* <div className="flex justify-center gap-1.5 py-3">
        <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
        <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
        <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
      </div> */}

      {/* Content Section */}
      <div className="flex-1 px-4 pb-6 pt-3">
        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {data.food_name}
        </h1>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {data.description}
        </p>

        {/* Info Cards Row */}
        <div className="flex gap-3 mb-4 items-center">
          <div className="flex-1 bg-card rounded-xl pl-4 py-3 border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Store size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-card-foreground">
                Food Origin
              </p>
              <p className="text-sm">{data.origin}</p>
            </div>
          </div>

          {/* Spicy Card */}
          <div className="flex-1 bg-card rounded-xl pl-4 py-3 border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Flame size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-card-foreground">
                Spice Level
              </p>
              <p className="text-sm">{data.spice_level}</p>
            </div>
          </div>
        </div>

        {/* Main Ingredients Section */}
        <div className="bg-card rounded-xl border border-border mb-4 overflow-hidden">
          <button
            onClick={() => setIsIngredientsOpen(!isIngredientsOpen)}
            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-card/80 transition-colors"
          >
            <span className="text-sm font-medium text-card-foreground">
              Main Ingredients
            </span>
            <ChevronDown
              size={20}
              className={`text-muted-foreground transition-transform duration-300 ${
                isIngredientsOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isIngredientsOpen && (
            <div className="border-t border-border px-4 py-3">
              <ul className="space-y-2">
                {data.main_ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-card-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleNutritionClick}
            className="w-full py-3 rounded-xl text-base font-medium text-black bg-[#FB6E3D] shadow-[0_4px_0_#FDAC8F] hover:scale-[1.02] active:translate-y-[2px] active:shadow-[0_2px_0_#FDAC8F] transition-all duration-150"
          >
            Nutritional value
          </button>
          <button
            onClick={handleRecipeClick}
            className="w-full py-3 rounded-xl text-base font-medium text-black bg-[#FB6E3D] shadow-[0_4px_0_#FDAC8F] hover:scale-[1.02] active:translate-y-[2px] active:shadow-[0_2px_0_#FDAC8F] transition-all duration-150"
          >
            Recipe
          </button>
          <button className="w-full py-3 rounded-xl text-base font-medium text-black bg-[#FB6E3D] shadow-[0_4px_0_#FDAC8F] hover:scale-[1.02] active:translate-y-[2px] active:shadow-[0_2px_0_#FDAC8F] transition-all duration-150">
            Food Location
          </button>
        </div>
      </div>
    </main>
  );
};
