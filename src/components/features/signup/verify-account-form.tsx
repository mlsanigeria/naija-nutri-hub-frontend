"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

import { REGEXP_ONLY_DIGITS } from "input-otp";

import { VerifyAccountFormSchema } from "@/lib/zod";

const CustomMailIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="oklch(0.816 0.104 40.49)"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <rect x="3" y="5" width="18" height="14" rx="4" />
        <path d="m7 9 5 3 5-3" />
    </svg>
);


export const VerifyAccountForm = () => {
    const [isOtpIncorrect, setIsOtpIncorrect] = useState(false);

    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    const username = email.split('@')[0];
    const lastThreeChars = username.length > 3 ? username.slice(-3) : username;
    const maskedEmail = `*****${lastThreeChars}@gmail.com`;


    const form = useForm<z.infer<typeof VerifyAccountFormSchema>>({
        resolver: zodResolver(VerifyAccountFormSchema),
        defaultValues: {
            code: "",
        },
    });

    function onSubmit(data: z.infer<typeof VerifyAccountFormSchema>) {
        const CORRECT_OTP = "123456";

        if (data.code !== CORRECT_OTP) {
            setIsOtpIncorrect(true);
            return;
        }

        setIsOtpIncorrect(false);
        toast.success("Account verified successfully!");
    }

    return (
        // --- RESPONSIVENESS ---
        // Added px-4 for padding on the sides on all screen sizes.
        <div className="flex flex-col items-center text-center space-y-8 max-w-sm px-4">

            {/* --- RESPONSIVENESS --- */}
            {/* Font size is smaller on mobile (text-3xl) and larger on tablets and up (sm:text-4xl). */}
            <h1 className="text-3xl sm:text-4xl font-serif">
                We sent you a mail
            </h1>

            {/* --- RESPONSIVENESS --- */}
            {/* Icon is smaller on mobile (h-12 w-12) and larger on tablets and up (sm:h-14 sm:w-14). */}
            <CustomMailIcon className="h-12 w-12 sm:h-18 sm:w-18 text-primary" />

            {/* --- RESPONSIVENESS --- */}
            {/* Font size is smaller on mobile (text-sm) and larger on tablets and up (sm:text-base). */}
            <p className="text-sm sm:text-base text-muted-foreground">
                Enter the security code we sent to {maskedEmail}
            </p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center">
                                <FormControl>
                                    <InputOTP
                                        autoFocus
                                        maxLength={6}
                                        pattern={REGEXP_ONLY_DIGITS}
                                        {...field}
                                    >
                                        <InputOTPGroup className="gap-2">
                                            {/* --- RESPONSIVENESS --- */}
                                            {/* OTP boxes are now smaller on mobile to prevent overflow. */}
                                            <InputOTPSlot className="h-10 w-10 sm:h-12 sm:w-12 rounded-md sm:rounded-lg border text-base sm:text-lg" index={0} />
                                            <InputOTPSlot className="h-10 w-10 sm:h-12 sm:w-12 rounded-md sm:rounded-lg border text-base sm:text-lg" index={1} />
                                            <InputOTPSlot className="h-10 w-10 sm:h-12 sm:w-12 rounded-md sm:rounded-lg border text-base sm:text-lg" index={2} />
                                            <InputOTPSlot className="h-10 w-10 sm:h-12 sm:w-12 rounded-md sm:rounded-lg border text-base sm:text-lg" index={3} />
                                            <InputOTPSlot className="h-10 w-10 sm:h-12 sm:w-12 rounded-md sm:rounded-lg border text-base sm:text-lg" index={4} />
                                            <InputOTPSlot className="h-10 w-10 sm:h-12 sm:w-12 rounded-md sm:rounded-lg border text-base sm:text-lg" index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {isOtpIncorrect ? (
                        <div className="flex items-center justify-center gap-2 text-sm text-destructive">
                            <AlertCircle className="h-4 w-4" />
                            <p>Security code doesn&apos;t match</p>
                        </div>
                    ) : (
                        <p className="text-sm">
                            Resend code by Email
                        </p>
                    )}

                    <Button type="submit" className="w-full h-11 text-base">
                        Verify
                    </Button>
                </form>
            </Form>
        </div>
    );
};