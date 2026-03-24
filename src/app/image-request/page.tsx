"use client";

import { ArrowLeft, Image as ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProfileDropdown } from "@/components/ui/profile-dropdown";

export default function ScanPage() {
  const foodSamples = ["Jollof rice", "Kebabs", "Egusi soup"];

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center px-6 py-6">
      {/* Top Navigation */}
      <div className="w-full max-w-md flex justify-between items-center mb-12">
        <Link
          href="/"
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <ProfileDropdown />
      </div>

      {/* Header */}
      <section className="max-w-md text-center space-y-4">
        <h1 className="text-3xl font-semibold">What are you eating?</h1>
        <p className="text-muted-foreground">
          Scan a photo or upload an image to identify your food and its
          nutritional information
        </p>
      </section>

      {/* Buttons */}
      <div className="flex flex-col gap-4 mt-10 w-full max-w-xs text-primary">
        {/* Scan an image */}
        <Link href="/scan-image">
          <Button
            variant="outline"
            className="w-full bg-card hover:bg-secondary border border-border flex items-center justify-center gap-2 px-5 py-7"
          >
            <ImageIcon size={18} />
            Scan an image
          </Button>
        </Link>

        {/* Add photos & files */}
        <Link href="/upload-image">
          <Button
            variant="outline"
            className="w-full bg-card hover:bg-secondary border border-border flex items-center justify-center gap-2 px-5 py-7"
          >
            <Upload size={18} />
            Add photos & files
          </Button>
        </Link>
      </div>

      {/* Food chips */}
      <div className="flex flex-wrap justify-center gap-3 mt-10">
        {foodSamples.map((item) => (
          <span
            key={item}
            className="px-4 py-1.5 text-sm rounded-full border border-border text-foreground/80 hover:border-primary hover:text-primary transition-colors"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Footer */}
      <p className="text-muted-foreground text-sm text-center max-w-sm mt-8">
        Discover community made foods, recipes, nutrition and locations to get
        them
      </p>
    </main>
  );
}
