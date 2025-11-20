"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  CheckCircle2,
  CheckCircle,
  CircleCheck,
  CheckCheckIcon,
  LucideCheckCircle,
  LucideCheckCircle2,
  CheckCircle2Icon,
} from "lucide-react"; // 1. IMPORT CheckCircle2 icon
import { NewPasswordFormSchema } from "@/lib/zod";
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
import { useRouter } from "next/navigation";

export const NewPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  // const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(false);
  const [_, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false); // 2. ADD state to track success

  const form = useForm<z.infer<typeof NewPasswordFormSchema>>({
    resolver: zodResolver(NewPasswordFormSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  async function onSubmit(values: z.infer<typeof NewPasswordFormSchema>) {
    setIsLoading(true);
    setError(null);
    try {
      // --- API DOCUMENTATION STARTS HERE ---
      // This is a placeholder for the real API call. A backend developer will replace this.
      // const response = await api.resetPassword({ token, newPassword: values.newPassword });

      // Expected API Contract:
      // Endpoint: POST /api/auth/reset-password
      // Request Body: { token: string, newPassword: string }
      // Success Response (200 OK): { message: "Password updated successfully" }
      // Error Response (400 Bad Request): { error: "Invalid or expired token" }
      // --- API DOCUMENTATION ENDS HERE ---

      // We simulate the API call so the loading spinner works
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // On success, set the success state to true
      setIsSuccess(true);
    } catch {
      setError("Your password reset link may be invalid or expired.");
    } finally {
      setIsLoading(false);
    }
  }

  // 4. ADD the new Success UI component
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center text-center space-y-8 max-w-sm px-4">
        <CheckCircle2 className="h-20 w-20 text-[#FC865C]" />
        <h1 className="text-3xl sm:text-4xl font-serif">Successful!</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Congratulations! Your password has been successfully updated. Click
          Continue to Log In.
        </p>
        <Button className="w-full" onClick={() => router.push("/login")}>
          Continue
        </Button>
      </div>
    );
  }

  // 5. The original form is now the default return value
  return (
    <div className="flex flex-col items-center text-center space-y-8 max-w-sm px-4">
      <h1 className="text-3xl sm:text-4xl font-serif">Set a New Password</h1>
      <p className="text-sm sm:text-base text-muted-foreground">
        Your new password must be different from previous passwords.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          {/* New Password Field */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9e9e9e]" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      className="pl-10 placeholder:text-[#9e9e9e]"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeIcon className="h-4 w-4 text-[#9e9e9e]" />
                      ) : (
                        <EyeOffIcon className="h-4 w-4 text-[#9e9e9e]" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9e9e9e]" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter Password"
                      className="pl-10 placeholder:text-[#9e9e9e]"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeIcon className="h-4 w-4 text-[#9e9e9e]" />
                      ) : (
                        <EyeOffIcon className="h-4 w-4 text-[#9e9e9e]" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            Update Password
          </Button>
        </form>
      </Form>
    </div>
  );
};
