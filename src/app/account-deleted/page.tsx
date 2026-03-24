"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserX } from "lucide-react";

export default function AccountDeletedPage() {
  const router = useRouter();

  // Redirect to login after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center text-foreground px-6">
      {/* Icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
          <UserX className="w-12 h-12 text-primary" />
        </div>
        {/* X badge */}
        <div className="absolute -right-1 -bottom-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white font-bold text-lg">×</span>
        </div>
      </div>

      {/* Message */}
      <h1 className="text-2xl font-semibold text-center mb-4">
        Your account has been deleted.
      </h1>
      <p className="text-muted-foreground text-center max-w-xs">
        Thanks for using our product.
        <br />
        We look forward to seeing you again.
      </p>

      {/* Redirect notice */}
      <p className="text-muted-foreground/70 text-sm mt-8">
        Redirecting to login...
      </p>
    </main>
  );
}
