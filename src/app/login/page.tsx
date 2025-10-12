import { LoginForm } from "@/components/features/login/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#222222] px-4">
      <main className="w-full max-w-md">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-normal text-white leading-none" style={{ fontFamily: 'var(--font-source-serif-pro)' }}>Welcome back</h1>
        </header>
        <LoginForm />
        <div className="mt-6 text-center">
          <p className="text-white text-sm leading-none" style={{ fontFamily: 'var(--font-manrope)' }}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-bold">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
