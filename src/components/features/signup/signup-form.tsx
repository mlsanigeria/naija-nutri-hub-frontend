"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  LockIcon,
  User,
  Loader2,
  AlertCircle,
  EyeIcon,
  EyeOffIcon,
  MailIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupFormSchema } from "@/lib/zod";
import { FormError } from "@/components/ui/form-error"; // Import the new component
import { axiosInstance } from "@/lib/axios";
import { ErrorDetailField } from "@/lib/types";
import { parseErrorMessage } from "@/lib/utils";

export const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupFormSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      // Map the form values to match the API request body format
      const requestData = {
        firstname: values.first_name,
        lastname: values.last_name,
        username: values.username,
        email: values.email,
        password: values.password,
      };

      await axiosInstance.post("/sign-up", requestData);

      toast.success("Account created successfully! Check your email.");
      router.push(`/verify-account?email=${encodeURIComponent(values.email)}`);
    } catch (apiError: unknown) {
      const responseDetail = (
        apiError as { response?: { data?: { detail?: ErrorDetailField } } }
      )?.response?.data?.detail;

      const message = parseErrorMessage(responseDetail);

      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center text-center space-y-8 w-full max-w-md px-4">
      {/* 1. Title */}
      <h1 className="text-3xl sm:text-4xl font-serif pt-8 pb-4 px-4">
        Create an account to get started
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          {/* 2. First Name and Last Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field, fieldState }) => (
                <FormItem className="text-left">
                  <FormLabel htmlFor="first_name">First name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="first_name"
                        placeholder="First name"
                        className="h-11 placeholder:text-[#9e9e9e] text-xs"
                        autoComplete="given-name"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormError message={fieldState.error?.message} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field, fieldState }) => (
                <FormItem className="text-left">
                  <FormLabel htmlFor="last_name">Last name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="last_name"
                        placeholder="Last name"
                        className="h-11 placeholder:text-[#9e9e9e] text-xs"
                        autoComplete="family-name"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormError message={fieldState.error?.message} />
                </FormItem>
              )}
            />
          </div>

          {/* 3. Username Field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <FormItem className="text-left">
                <FormLabel htmlFor="username">Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9e9e9e]" />
                    <Input
                      id="username"
                      placeholder="Enter username"
                      className="h-11 pl-10 placeholder:text-[#9e9e9e] text-xs"
                      autoComplete="username"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormError message={fieldState.error?.message} />
              </FormItem>
            )}
          />

          {/* 4. Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem className="text-left">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9e9e9e]" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email"
                      className="h-11 pl-10 placeholder:text-[#9e9e9e] text-xs"
                      autoComplete="email"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormError message={fieldState.error?.message} />
              </FormItem>
            )}
          />

          {/* 5. Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem className="text-left">
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9e9e9e]" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="h-11 pl-10 pr-10 placeholder:text-[#9e9e9e] text-xs"
                      autoComplete="new-password"
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

                <div className="flex items-start gap-1 text-xs text-[#9e9e9e] mt-2">
                  <AlertCircle className="h-4 w-3 flex-shrink-0" />
                  <p>
                    Must have at least 8 characters, contain an uppercase
                    letter, a lowercase letter, a number, and a special
                    character.
                  </p>
                </div>
                <FormError message={fieldState.error?.message} />
              </FormItem>
            )}
          />

          {/* This snippet adds the confirm password button
                    <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field, fieldState }) => (
                            <FormItem className="text-left">
                                <FormLabel htmlFor="confirm_password">
                                    Confirm Password
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9e9e9e]" />
                                        <Input
                                            id="confirm_password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            className="h-11 pl-10 pr-10 placeholder:text-[#9e9e9e] text-xs"
                                            autoComplete="new-password"
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
                                <FormError message={fieldState.error?.message} />
                            </FormItem>
                        )}
                    />*/}

          {/* Render API Error Message */}
          {error && (
            <div className="flex items-center justify-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}

          {/* 7. Create Account Button */}
          <Button
            type="submit"
            className="w-full h-11 text-base font-serif"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Creating account..." : "Create account"}
          </Button>

          {/* 8. Log In Link */}
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="font-bold hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};
