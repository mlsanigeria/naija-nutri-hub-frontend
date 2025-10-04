"use client";

import { useState } from "react";

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
import { EyeIcon, EyeOffIcon, MailIcon, UserIcon } from "lucide-react";

import { VerifyAccountDialog } from "@/components/features/signup/verify-account-dialog";

export const SignupForm = () => {
  // controls the verify-account dialog
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignupFormSchema>) {
    console.log(values);

    // success
    setOpen(true);
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-white text-sm">Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                    <Input 
                      placeholder="Enter username" 
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
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-white text-sm">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                    <Input 
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="password" className="text-white text-sm">Password</FormLabel>
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
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8333 9.16663H4.16667C3.24619 9.16663 2.5 9.91282 2.5 10.8333V16.6666C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6666V10.8333C17.5 9.91282 16.7538 9.16663 15.8333 9.16663Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.83325 9.16663V5.83329C5.83325 4.72822 6.27224 3.66842 7.05364 2.88701C7.83504 2.10561 8.89485 1.66663 9.99992 1.66663C11.105 1.66663 12.1648 2.10561 12.9462 2.88701C13.7276 3.66842 14.1666 4.72822 14.1666 5.83329V9.16663" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
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
          <Button 
            type="submit" 
            className="w-full bg-[#FF7A50] hover:bg-[#FF7A50]/90 text-white py-3 rounded-md h-12"
          >
            Sign Up
          </Button>
        </form>
      </Form>

      <VerifyAccountDialog
        email={form.getValues("email")}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};
