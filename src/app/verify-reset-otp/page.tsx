"use client";

import { Suspense, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

function VerifyResetOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || localStorage.getItem("resetEmail");

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (!/^\d{6}$/.test(otpCode)) {
      toast.error("Please enter a valid 6-digit numeric code");
      return;
    }

    if (!email) {
      toast.error(
        "Email not found. Please restart the password reset process.",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/verify_reset_otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: otpCode }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("resetEmail", email);
        toast.success("OTP verified successfully!");
        router.push(`/new-password?email=${encodeURIComponent(email)}`);
      } else {
        const errorMsg = Array.isArray(data.detail)
          ? data.detail[0]?.msg
          : typeof data.detail === "string"
            ? data.detail
            : "Invalid or expired OTP";
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <section className="w-full max-w-sm text-center">
        {/* Header */}
        <h2
          className="text-3xl text-foreground font-semibold mb-3"
          style={{ fontFamily: "var(--font-source-serif-pro)" }}
        >
          We sent you a mail
        </h2>

        {/* Mail Icon */}
        <div className="flex justify-center mb-6">
          <Image src="/icons/mail-02.png" alt="mail" width={56} height={56} />
        </div>

        {/* Instruction Text */}
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          Enter the one time password (OTP) we sent to
          <span className="block text-muted-foreground/70 font-medium mt-1">
            ********{email?.slice(-7)}
          </span>
        </p>

        {/* OTP Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-3">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                maxLength={1}
                disabled={loading}
                className="w-14 h-14 text-center text-foreground text-lg bg-transparent border border-border rounded-sm focus:border-primary focus:ring-0"
              />
            ))}
          </div>

          <p className="text-muted-foreground text-md mb-6 text-start">
            <a
              href="/forgot-password"
              className="hover:text-primary transition-colors"
            >
              Resend code by Email
            </a>
          </p>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white py-7 rounded-md font-semibold text-base"
            style={{ fontFamily: "var(--font-source-serif-pro)" }}
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </section>
    </main>
  );
}

export default function VerifyResetOtpPage() {
  return (
    <Suspense
      fallback={<div className="text-white text-center mt-10">Loading...</div>}
    >
      <VerifyResetOtpContent />
    </Suspense>
  );
}
