"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Camera, Apple, ChefHat } from "lucide-react";
import { useTheme } from "next-themes";
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
  const { resolvedTheme } = useTheme();
  const user = useAuthStore((state) => state.user);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const iconStrokeColor = mounted
    ? resolvedTheme === "dark"
      ? "#FFEDE7"
      : "#F97316"
    : "#F97316";
  const iconStrokeWidth = mounted ? (resolvedTheme === "dark" ? 1 : 1.5) : 1.5;

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
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Love"
          >
            <path
              d="M3.33359 4.66669L2.52105 5.20837C1.93857 5.59669 1.64733 5.79085 1.4895 6.08696C1.33167 6.38307 1.33284 6.73109 1.33517 7.42709C1.33799 8.26502 1.34578 9.11882 1.36735 9.98275C1.41851 12.0325 1.44409 13.0574 2.19769 13.811C2.95129 14.5646 3.99 14.5906 6.06741 14.6425C7.35982 14.6748 8.64075 14.6748 9.93309 14.6425C12.0106 14.5906 13.0492 14.5646 13.8028 13.811C14.5564 13.0574 14.582 12.0325 14.6332 9.98275C14.6548 9.11882 14.6625 8.26502 14.6654 7.42709C14.6677 6.73109 14.6688 6.38306 14.511 6.08696C14.3532 5.79085 14.062 5.59669 13.4794 5.20837L12.6669 4.66669"
              stroke={iconStrokeColor}
              strokeWidth={iconStrokeWidth}
              strokeLinejoin="round"
            />
            <path
              d="M1.33331 6.66669L5.94199 9.43189C6.94465 10.0335 7.44598 10.3343 7.99998 10.3343C8.55398 10.3343 9.05531 10.0335 10.058 9.43189L14.6666 6.66669"
              stroke={iconStrokeColor}
              strokeWidth={iconStrokeWidth}
              strokeLinejoin="round"
            />
            <path
              d="M3.33331 7.99998V3.99998C3.33331 2.7429 3.33331 2.11436 3.72384 1.72384C4.11437 1.33331 4.74291 1.33331 5.99998 1.33331H9.99999C11.2571 1.33331 11.8856 1.33331 12.2761 1.72384C12.6667 2.11436 12.6667 2.7429 12.6667 3.99998V7.99998"
              stroke={iconStrokeColor}
              strokeWidth={iconStrokeWidth}
            />
            <path
              d="M6.50749 4.1841C7.04381 3.87949 7.51194 4.00224 7.79314 4.19778C7.90841 4.27795 7.96608 4.31804 8.00001 4.31804C8.03394 4.31804 8.09154 4.27795 8.20688 4.19778C8.48808 4.00224 8.95621 3.87949 9.49254 4.1841C10.1964 4.58388 10.3557 5.90275 8.73208 7.01547C8.42288 7.2274 8.26821 7.33334 8.00001 7.33334C7.73174 7.33334 7.57714 7.2274 7.26788 7.01547C5.64434 5.90275 5.80362 4.58388 6.50749 4.1841Z"
              stroke={iconStrokeColor}
              strokeWidth={iconStrokeWidth}
              strokeLinecap="round"
            />
          </svg>
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
