"use client";

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

import { Mail } from "lucide-react";

import { ForgotPasswordFormSchema } from "@/lib/zod";

export const ResetPasswordForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof ForgotPasswordFormSchema>) {
    // make api call to reset password
    console.log(data);
    toast.success("Reset link sent to your email!");
    router.push("/verify-account");
  }

  return (
    <div className="max-w-[600px] mx-auto p-8 rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-serif font-semibold text-foreground mb-4">
          Reset Your Password
        </h1>
        <p className="text-foreground/80 text-sm leading-relaxed">
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
              <FormItem>
                <FormLabel htmlFor="email" className="text-foreground">
                  Email
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                    <Input
                      type="email"
                      autoComplete="email"
                      id="email"
                      placeholder="Enter email"
                      className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full py-4 cursor-pointer text-sm bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
};
