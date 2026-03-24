"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Camera, Apple, ChefHat } from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProfileDropdown } from "@/components/ui/profile-dropdown";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const features: Feature[] = [
  {
    id: "classify",
    title: "Food Classification",
    description:
      "Snap or upload a photo to identify Nigerian dishes instantly using AI",
    icon: <Camera className="w-8 h-8" />,
    href: "/image-request",
    color: "from-orange-500/20 to-orange-600/10",
  },
  {
    id: "recipes",
    title: "Recipe Generation",
    description:
      "Get AI-generated recipes for your favorite Nigerian dishes with step-by-step instructions",
    icon: <ChefHat className="w-8 h-8" />,
    href: "/recipe",
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    id: "nutrition",
    title: "Nutritional Estimates",
    description:
      "Get detailed nutritional breakdown of your meals - calories, proteins, carbs, and more",
    icon: <Apple className="w-8 h-8" />,
    href: "/nutrition",
    color: "from-green-500/20 to-green-600/10",
  },
];

export default function Home() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const handleFeatureClick = (feature: Feature) => {
    if (user?.token) {
      router.push(feature.href);
    } else {
      setSelectedFeature(feature);
      setShowLoginPrompt(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="w-full px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Naija Nutri Hub"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full"
            />
          </div>

          <ProfileDropdown />
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <section className="text-center mb-16">
            <h1
              className="text-4xl md:text-5xl font-normal mb-4"
              style={{ fontFamily: "var(--font-source-serif-pro)" }}
            >
              Discover Nigerian <span className="text-primary">Food</span>
              <br />
              <span className="text-muted-foreground">Like Never Before</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-lg">
              An AI-powered platform to identify, learn about, and cook Nigerian
              dishes. Scan your food, get nutrition facts, and find recipes.
            </p>
          </section>

          {/* Features Grid */}
          <section className="mb-16">
            <h2 className="text-sm font-medium text-primary mb-6 px-1">
              What would you like to do?
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => handleFeatureClick(feature)}
                  className={`group relative bg-card hover:bg-secondary border border-border rounded-2xl p-6 text-left transition-all hover:scale-[1.02] hover:shadow-lg`}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Community Preview */}
          <section className="mb-12">
            <p className="text-foreground mb-4">
              See what&apos;s on the plate of our community with NutriScan
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { src: "/images/food-image1.svg", name: "Jollof rice" },
                { src: "/images/food-image2.svg", name: "Matcha pancake" },
                { src: "/images/food-image3.svg", name: "Sushi" },
                { src: "/images/food-image4.svg", name: "Chicken burger" },
                { src: "/images/food-image5.svg", name: "Beef steak" },
                { src: "/images/food-image6.svg", name: "Egg & Avocado" },
              ].map((food, i) => (
                <div key={i} className="flex flex-col">
                  <Image
                    src={food.src}
                    alt={food.name}
                    width={100}
                    height={108}
                    className="rounded-lg mb-2 w-full aspect-square object-cover"
                  />
                  <p className="text-xs truncate">{food.name}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border">
        <div className="max-w-4xl mx-auto flex justify-center items-center gap-2 text-sm text-muted-foreground">
          Made with Open Source
          <Image
            src="/icons/mail-open-love.svg"
            alt="Love"
            width={16}
            height={16}
          />
        </div>
      </footer>

      {/* Login Prompt Modal */}
      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent className="bg-card border-border text-foreground max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">
              Sign in to continue
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-center mt-2">
              {selectedFeature && (
                <>
                  To access{" "}
                  <span className="text-primary font-medium">
                    {selectedFeature.title}
                  </span>
                  , please log in or create an account.
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-6">
            <Link href="/login" className="w-full">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg">
                Log in
              </Button>
            </Link>
            <Link href="/signup" className="w-full">
              <Button
                variant="outline"
                className="w-full bg-transparent border-border text-foreground hover:bg-secondary py-3 rounded-lg"
              >
                Create an account
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
