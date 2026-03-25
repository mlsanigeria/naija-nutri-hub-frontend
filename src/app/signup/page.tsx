// src/app/signup/page.tsx
import { SignUpForm } from "@/components/features/signup/signup-form";
import { Suspense } from "react"; // Needed if using useSearchParams in SignUpForm
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignUpPage() {
  return (
    // Wrap in Suspense if SignUpForm reads search params
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center min-h-screen bg-background px-4 pt-6">
        {/* Back Button */}
        <div className="w-full max-w-md mb-6">
          <Link
            href="/"
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
        <main className="w-full max-w-md flex-1">
          <SignUpForm />
        </main>
      </div>
    </Suspense>
  );
}
