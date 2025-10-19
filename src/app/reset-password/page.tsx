import { ResetPasswordForm } from "@/components/features/reset-password/reset-password-form";
import Link from "next/link";

import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen max-w-[400px] mx-auto flex flex-col items-center justify-center px-4">
      <section className="flex flex-col text-center w-full">
        <Suspense fallback={<p>Loading...</p>}>
          <ResetPasswordForm />
        </Suspense>

        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-[#FF7A50] hover:text-[#FF7A50]/80 text-sm font-medium"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
