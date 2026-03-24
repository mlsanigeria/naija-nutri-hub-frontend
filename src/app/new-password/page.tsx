import { NewPasswordForm } from "@/components/features/reset-password/new-password-form";
import { Suspense } from "react";

export default function NewPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <Suspense fallback={<p>Loading...</p>}>
        <NewPasswordForm />
      </Suspense>
    </div>
  );
}
