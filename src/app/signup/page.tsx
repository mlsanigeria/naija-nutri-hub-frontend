"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EyeIcon, EyeOffIcon, MailIcon, User2, Lock, Info } from "lucide-react";

import { Button } from "@/components/ui/button";


function SignupFormContent() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };


  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Creating account...");

    try {
      const response = await fetch(
        "https://naija-nutri-hub.azurewebsites.net/sign-up",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Sign up successful! Redirecting...");
        localStorage.setItem("pendingEmail", form.email);

        router.push(`/verify-account?email=${encodeURIComponent(form.email)}`);
      } else {
        setMessage(`Sign up failed: ${data.message || "Try again."}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen background text-foreground">
      <div className="flex flex-col gap-4 w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-4 text-foreground" style={{ fontFamily: 'var(--font-source-serif-pro)' }}>
          Create Your Account
        </h2>

        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="w-full flex gap-x-4">
              <div className="flex-1">
                <label htmlFor="firstname" className="text-foreground text-sm leading-none" style={{ fontFamily: 'var(--font-manrope)' }}>First name</label>
                <input
                  name="firstname"
                  placeholder="First Name"
                  onChange={handleChange}
                  required
                  className="w-full rounded-md background border h-12 pl-2 text-input placeholder:text-input focus:text-foreground"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="lastname" className="text-foreground text-sm leading-none" style={{ fontFamily: 'var(--font-manrope)' }}>First name</label>
                <input
                  name="lastname"
                  placeholder="Last Name"
                  onChange={handleChange}
                  required
                  className="w-full rounded-md background border h-12 pl-2 text-input placeholder:text-input focus:text-foreground"
                />
              </div>
            </div>

            <div>
              <label htmlFor="Username" className="text-foreground text-sm leading-none" style={{ fontFamily: 'var(--font-manrope)' }}>Username</label>
              <div className="relative">
                <User2 className="absolute left-3 top-1/2 -translate-y-1/2 text-input size-5" />
                <input
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  required
                  className="w-full rounded-md background border h-12 pl-10 text-input placeholder:text-input focus:text-foreground"
                />
              </div>  
            </div>

            <div>
              <label htmlFor="email" className="text-foreground text-sm leading-none" style={{ fontFamily: 'var(--font-manrope)' }}>Email</label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-input size-5" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                  className="w-full rounded-md background border h-12 pl-10 text-input placeholder:text-input focus:text-foreground"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-foreground text-sm leading-none" style={{ fontFamily: 'var(--font-manrope)' }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-input size-5" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  className="w-full rounded-md background border h-12 pl-10 pr-10 text-input placeholder:text-input focus:text-foreground"
                />

                <Button
                  type="button"
                  id="toggle-password"
                  aria-label="Show password as plain text. Warning: this will display your password on the screen."
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
            </div>

            <div className="flex items-center text-sm text-accent">
              <Info className="mr-2 size-4 flex-shrink-0" />
              Must contain 1 Uppercase letter, 1 number and a minimum of 8 characters
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 h-12 cursor-pointer rounded-md transition-all"
            >
              Create account
            </button>
              
            {message && (
              <p className="mt-3 text-center text-sm text-gray-300">{message}</p>
            )}
          </form>

          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account? <a href="/login" className="text-foreground hover:underline">Log in</a>
          </p>

        </div>
      </div>
    </div>
  );
}

export default function SignupForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupFormContent />
    </Suspense>
  );
}
