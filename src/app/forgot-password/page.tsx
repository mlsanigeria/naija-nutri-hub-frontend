"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ForgotPasswordForm } from "@/components/features/forgot-password/forgot-password-form";

export default function ForgotPasswordPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen text-center flex-col items-center justify-center bg-[#222222] relative">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>

      <section className="w-full max-w-md px-8">
        <h2
          className="text-2xl mb-2"
          style={{ fontFamily: "var(--font-source-serif-pro)" }}
        >
          Reset your password
        </h2>
        <p
          className="text-gray-40  0 mb-6"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Enter your email address and we&apos;ll send you a link to reset your
          password
        </p>
        <ForgotPasswordForm />
      </section>
    </main>
  );
}
