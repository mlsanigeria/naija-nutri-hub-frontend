import Link from "next/link";

import { SignupForm } from "@/components/features/signup/signup-form";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#222222] px-4">
      <main className="w-full max-w-md">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-medium text-white">Signup to get started</h1>
        </header>
        <SignupForm />
        <div className="mt-6 text-center">
          <p className="text-white text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-[#FF7A50] font-medium">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
