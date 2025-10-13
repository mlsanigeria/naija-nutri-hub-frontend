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

import { SignupFormSchema } from "@/lib/zod";
import { EyeIcon, EyeOffIcon, MailIcon, User2, Lock, Info } from "lucide-react";

export const SignupForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

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

  function onSubmit(values: z.infer<typeof SignupFormSchema>) {
    console.log(values);
    router.push(`/verify-account?email=${values.email}`);
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          method="POST"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel htmlFor="first_name" className="text-foreground text-sm leading-none" style={{ fontFamily: 'var(--font-manrope)' }}>First name</FormLabel>
                  <FormControl>
                    <Input 
                      id="first_name"
                      autoComplete="given-name"
                      placeholder="First name" 
                      className="background border rounded-md h-12 text-input focus:text-foreground placeholder:text-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel htmlFor="last_name" className="text-foreground text-sm leading-none" style={{ fontFamily: 'var(--font-manrope)' }}>Last name</FormLabel>
                  <FormControl>
                    <Input 
                      id="last_name"
                      autoComplete="family-name"
                      placeholder="Last name" 
                      className="background border rounded-md h-12 text-input focus:text-foreground placeholder:text-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="username" className="text-foreground text-sm leading-none" style={{ fontFamily: 'var(--font-manrope)' }}>Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User2 className="absolute left-3 top-1/2 -translate-y-1/2 text-input size-5" />
                    <Input 
                      id="username"
                      autoComplete="username"
                      placeholder="Enter username" 
                      className="background border rounded-md pl-10 h-12 text-input focus:text-foreground placeholder:text-input"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="email" className="text-foreground text-sm leading-none" style={{ fontFamily: 'var(--font-manrope)' }}>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-input size-5" />
                    <Input
                      id="email"
                      autoComplete="email"
                      placeholder="Enter email"
                      className="background border rounded-md pl-10 h-12 text-input focus:text-foreground placeholder:text-input"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="password" className="text-foreground text-sm leading-none" style={{ fontFamily: 'var(--font-manrope)' }}>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-input size-5" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      aria-describedby="password-constraints"
                      autoComplete="new-password"
                      id="password"
                      placeholder="Enter Password"
                      className="background border rounded-md pl-10 pr-10 h-12 text-input focus:text-foreground placeholder:text-input"
                      {...field}
                    />
                    <Button
                      type="button"
                      id="toggle-password"
                      aria-label="Show password as plain text. Warning: this will display your password on the screen."
                      variant="ghost"
                      size="icon"
                      onClick={togglePasswordVisibility}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-input hover:bg-transparent"
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
                <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                  <Info className="size-4 text-[#9CA3AF]" />
                  <span style={{ fontFamily: 'var(--font-manrope)', fontSize: '12px' }} className="text-[#565656]">Must contain 1 uppercase letter, 1 number and a minimum of 8 characters</span>
                </div>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-md h-12 font-semibold text-sm leading-none"
            style={{ fontFamily: 'var(--font-source-serif-pro)' }}

          >
            Create account
          </Button>
        </form>
      </Form>
    </div>
  );
};
