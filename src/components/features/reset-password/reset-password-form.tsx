"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";

import { ForgotPasswordFormSchema } from "@/lib/zod";
import { axiosInstance } from "@/lib/axios";

export const ResetPasswordForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof ForgotPasswordFormSchema>) {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/reset-password", {
        email: data.email,
      });

      if (response.status === 200) {
        toast.success("Reset link sent to your email!");
        // Navigate to verify account page with email parameter
        router.push(
          `/verify-account?email=${encodeURIComponent(data.email)}&type=reset`,
        );
      }
    } catch (error: unknown) {
      console.error("Reset password error:", error);

      // Handle different error scenarios
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { status?: number; data?: { message?: string } };
        };

        if (axiosError.response?.status === 404) {
          toast.error("Email not found. Please check your email address.");
        } else if (axiosError.response?.status === 429) {
          toast.error("Too many requests. Please try again later.");
        } else if (axiosError.response?.status === 400) {
          toast.error(
            axiosError.response.data?.message ||
              "Invalid request. Please try again.",
          );
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-serif font-semibold text-white mb-4">
          Reset Your Password
        </h1>
        <p className="text-white/80 text-sm leading-relaxed">
          Enter your email address and we&apos;ll send you a link to reset your
          password
        </p>
      </div>

      <Form {...form}>
        <form
          method="POST"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel
                  htmlFor="email"
                  className="text-white text-sm leading-none"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  Email
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <img
                      src="/icons/mail-01.png"
                      alt="mail"
                      className="absolute left-3 top-1/2 -translate-y-1/2 size-5"
                    />
                    <Input
                      type="email"
                      autoComplete="email"
                      id="email"
                      placeholder="Enter email"
                      className="bg-[#222222] border border-[#444444] rounded-md pl-10 h-12 text-white"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF7A50] hover:bg-[#FF7A50]/90 text-white py-3 rounded-md h-12 font-semibold text-sm leading-none disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "var(--font-source-serif-pro)" }}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
