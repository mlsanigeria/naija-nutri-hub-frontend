"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormSchema } from "@/lib/zod";
import { EyeIcon, EyeOffIcon, User } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { axiosInstance } from "@/lib/axios";
import { parseErrorMessage } from "@/lib/utils";
import { ErrorDetailField } from "@/lib/types";
import { useAuthStore } from "@/stores/auth";

export function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleRememberMe = () => setRememberMe((prev) => !prev);

  // (removed unused email helper)

  const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    setErrorMessage("");
    setLoading(true);

    try {
      // Backend likely expects OAuth2PasswordRequestForm-style form data
      const requestBody = {
        username: String(values.identifier ?? "").trim(),
        password: String(values.password ?? ""),
      };
      const formBody = new URLSearchParams();
      formBody.append("username", requestBody.username);
      formBody.append("password", requestBody.password);
      // Some FastAPI setups require grant_type to be present
      formBody.append("grant_type", "password");

      // Send as x-www-form-urlencoded
      const response = await axiosInstance.post("/login", formBody, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      setUser({ token: response.data?.access_token });
      router.push("/image-request");
    } catch (apiError: unknown) {
      console.error(apiError);
      const responseDetail = (
        apiError as { response?: { data?: { detail?: ErrorDetailField } } }
      )?.response?.data?.detail;

      const message = parseErrorMessage(responseDetail);

      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel
                  className="text-white text-sm leading-none"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  Email or Username
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9e9e9e]" />
                    <Input
                      placeholder="Enter email or username"
                      className="bg-[#222222] border border-[#444444] rounded-md pl-10 h-12 text-white"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel
                  htmlFor="password"
                  className="text-white text-sm leading-none"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      aria-describedby="password-constraints"
                      autoComplete="current-password"
                      id="password"
                      placeholder="Enter Password"
                      className="bg-[#222222] border border-[#444444] rounded-md pl-10 pr-10 h-12 text-white"
                      {...field}
                    />
                    <img
                      src="/icons/square-lock-password.png"
                      alt="lock"
                      className="absolute left-3 top-1/2 -translate-y-1/2 size-5"
                    />
                    <Button
                      type="button"
                      id="toggle-password"
                      aria-label="Show password as plain text. Warning: this will display your password on the screen."
                      variant="ghost"
                      size="icon"
                      onClick={togglePasswordVisibility}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:bg-transparent"
                    >
                      {showPassword ? (
                        <EyeOffIcon aria-hidden="true" className="size-5" />
                      ) : (
                        <EyeIcon aria-hidden="true" className="size-5" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide" : "Show"} password
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className={`w-5 h-5 border rounded cursor-pointer flex items-center justify-center ${
                  rememberMe
                    ? "bg-[#FF7A50] border-[#FF7A50]"
                    : "border-[#444444]"
                }`}
                onClick={toggleRememberMe}
              >
                {rememberMe && (
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 1L3.5 6.5L1 4"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <label
                className="text-white text-sm cursor-pointer leading-none"
                style={{ fontFamily: "var(--font-manrope)" }}
                onClick={toggleRememberMe}
              >
                Keep me logged in
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-white hover:text-[#FF7A50] leading-none"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Forgot password?
            </Link>
          </div>

          {errorMessage && (
            <div className="text-center text-red-500 text-sm">
              {errorMessage}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#FF7A50] hover:bg-[#FF7A50]/90 text-white py-3 rounded-md h-12 font-semibold text-sm leading-none"
            style={{ fontFamily: "var(--font-source-serif-pro)" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
