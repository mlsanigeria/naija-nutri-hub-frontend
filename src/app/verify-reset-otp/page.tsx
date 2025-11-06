"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

function VerifyResetOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || localStorage.getItem("resetEmail");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
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
          body: JSON.stringify({ email, otp }),
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
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#222222] px-4">
      <section className="w-full max-w-md text-center">
        <h2 className="text-2xl text-white mb-4">Verify Reset Code</h2>
        <p className="text-gray-400 mb-6">
          Enter the 6-digit code sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            maxLength={6}
            disabled={loading}
            className="border text-white h-12 text-center tracking-widest disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 h-12 hover:bg-[#FF7A50]/90 text-white rounded-md text-sm leading-none"
            style={{ fontFamily: "var(--font-source-serif-pro)" }}
          >
            {loading ? "Verifying..." : "Verify Code"}
          </Button>
        </form>

        <div className="mt-4 text-sm text-gray-400">
          Didn’t get a code?{" "}
          <a href="/forgot-password" className="text-[#FF7A50] font-semibold">
            Resend
          </a>
        </div>
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
