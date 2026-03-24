"use client";

import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { ProfileDropdown } from "@/components/ui/profile-dropdown";

export default function ComingSoonPage() {
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

      {/* Content */}
      <section className="flex-1 flex flex-col items-center justify-center max-w-md text-center space-y-6 -mt-20">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-[#FB6E3D]/10 flex items-center justify-center">
          <MapPin className="w-12 h-12 text-[#FB6E3D]" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold">Coming Soon</h1>

        {/* Description */}
        <p className="text-muted-foreground">
          We&apos;re working hard to bring you the Food Location feature. Soon
          you&apos;ll be able to find nearby restaurants and vendors serving
          your favorite Nigerian dishes!
        </p>

        {/* Back Button */}
        <Link
          href="/"
          className="mt-6 px-8 py-3 rounded-xl text-base font-medium text-black bg-[#FB6E3D] shadow-[0_4px_0_#FDAC8F] hover:scale-[1.02] active:translate-y-[2px] active:shadow-[0_2px_0_#FDAC8F] transition-all duration-150"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
