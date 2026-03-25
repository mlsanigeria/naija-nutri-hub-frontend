import { LoginForm } from "@/components/features/login/login-form";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background px-4 pt-6">
      {/* Back Button */}
      <div className="w-full max-w-md mb-6">
        <Link
          href="/"
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>
      <main className="w-full max-w-md flex-1 flex flex-col justify-center">
        <header className="mb-8 text-center">
          <Image
            src="/images/logo.png"
            alt="Naija Nutri Hub"
            width={80}
            height={80}
            className="w-20 h-20 mx-auto mb-4 rounded-full"
          />
          <h1
            className="text-2xl font-normal text-foreground leading-none"
            style={{ fontFamily: "var(--font-source-serif-pro)" }}
          >
            Welcome back
          </h1>
        </header>
        <LoginForm />
        <div className="mt-6 text-center">
          <p
            className="text-foreground text-sm leading-none"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-bold text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
