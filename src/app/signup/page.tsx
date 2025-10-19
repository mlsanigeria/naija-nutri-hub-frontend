import Link from "next/link";

import { SignupForm } from "@/components/features/signup/signup-form";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen background text-foreground">
      <main className="w-full max-w-md px-8">
        <header className="mb-8 text-center">
          <h1
            className="text-2xl font-normal text-foreground leading-none"
            style={{ fontFamily: "var(--font-source-serif-pro)" }}
          >
            Create an account to get started
          </h1>
        </header>
        <SignupForm />
        <div className="mt-4 text-center">
          <p
            className="text-foreground text-sm leading-none"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Already have an account?{" "}
            <Link href="/login" className="font-bold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
