"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

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

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { isAxiosError } from "axios";
import { ResetPasswordFormSchema } from "@/lib/zod";

export const ResetPasswordForm = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      token,
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof ResetPasswordFormSchema>) {
    const formValues = {
      token: data.token,
      password: data.password,
    };
  }

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password" className="text-foreground text-sm leading-none" style={{ fontFamily: "var(--font-manrope)" }}>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    id="password"
                    placeholder="Enter Password"
                    className="background border rounded-md pl-10 pr-10 h-12 text-input placeholder:text-input"
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
                    variant="link"
                    size="icon"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    disabled={form.getValues("password").length === 0}
                    className="absolute right-2 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed text-muted-foreground"
                  >
                    {showPassword ? (
                      <EyeOffIcon aria-hidden="true" className="size-4" />
                    ) : (
                      <EyeIcon aria-hidden="true" className="size-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide" : "Show"} password
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirm-new-password" className="text-foreground text-sm leading-none" style={{ fontFamily: "var(--font-manrope)" }}>
                Confirm Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    id="confirm-new-password"
                    placeholder="Re-enter Password"
                    className="background border rounded-md pl-10 pr-10 h-12 text-input placeholder:text-input"
                    {...field}
                  />
                  <img
                      src="/icons/square-lock-password.png"
                      alt="lock"
                      className="absolute left-3 top-1/2 -translate-y-1/2 size-5"
                  />
                  <Button
                    type="button"
                    id="toggle-confirm-password"
                    aria-label="Show password as plain text. Warning: this will display your password on the screen."
                    variant="link"
                    size="icon"
                    onClick={() =>
                      setShowConfirmPassword((prevState) => !prevState)
                    }
                    disabled={form.getValues("confirmPassword").length === 0}
                    className="absolute right-2 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed text-muted-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon aria-hidden="true" className="size-4" />
                    ) : (
                      <EyeIcon aria-hidden="true" className="size-4" />
                    )}
                    <span className="sr-only">
                      {showConfirmPassword ? "Hide" : "Show"} password
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-md h-12 font-medium text-sm leading-none" style={{ fontFamily: "var(--font-source-serif-pro)" }}>Update Password</Button>
      </form>
    </Form>
  );
};
