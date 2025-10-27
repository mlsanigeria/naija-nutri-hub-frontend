// src/app/signup/page.tsx
import { SignUpForm } from "@/components/features/signup/signup-form";
import { Suspense } from "react"; // Needed if using useSearchParams in SignUpForm

export default function SignUpPage() {
  return (
    // Wrap in Suspense if SignUpForm reads search params
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center justify-center min-h-screen">
        <SignUpForm />
      </div>
    </Suspense>
  );
}
