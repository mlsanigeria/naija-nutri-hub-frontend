import { ResetPasswordForm } from "@/components/features/reset-password/reset-password-form";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen max-w-[400px] mx-auto flex flex-col items-center justify-center">
      <section className="flex flex-col text-center">
        <Suspense fallback={<p>Loading...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </section>
    </main>
  );
}
