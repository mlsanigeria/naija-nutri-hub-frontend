"use client";

import { Image, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ScanPage() {
  const foodSamples = ["Jellof rice", "Kebabs", "Egusi soup"];

  return (
    <main className="min-h-screen text-neutral-100 flex flex-col items-center justify-center px-6 py-12">
      {/* Header */}
      <section className="max-w-md text-center space-y-4">
        <h1 className="text-3xl font-semibold">What are you eating?</h1>
        <p className="text-neutral-400">
          Scan a photo or upload an image to identify your food and its nutritional information
        </p>
      </section>

      {/* Buttons */}
      <div className="flex flex-col gap-4 mt-10 w-full max-w-xs text-[#FF7A50]">
      {/* Scan an image */}
      <Link href="/scan-image">
        <Button
          variant="outline"
          className="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center gap-2 px-5 py-7"
        >
          <Image size={18} />
          Scan an image
        </Button>
      </Link>

      {/* Add photos & files */}
      <Link href="/upload-image">
        <Button
          variant="outline"
          className="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center gap-2 px-5 py-7"
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
            className="px-4 py-1.5 text-sm rounded-full border border-neutral-700 text-neutral-200 hover:border-amber-500 hover:text-amber-400 transition-colors"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Footer */}
      <p className="text-neutral-500 text-sm text-center max-w-sm mt-8">
        Discover community made foods, recipes, nutrition and locations to get them
      </p>
    </main>
  );
}
