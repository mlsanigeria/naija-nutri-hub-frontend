import { ResetPasswordForm } from "@/components/features/reset-password/reset-password-form";

import Image from "next/image";

import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center background text-foreground">
      <section className="w-full max-w-md px-8">
        <h2 className="text-2xl font-normal text-center mb-6" style={{ fontFamily: 'var(--font-source-serif-pro)' }}>Set a new password</h2>
        <Suspense fallback={<p>Loading...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </section>
    </main>
  );
}
