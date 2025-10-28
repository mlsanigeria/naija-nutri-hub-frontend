import { z } from "zod";

export const LoginFormSchema = z
  .object({
    identifier: z
      .string()
      .min(1, {
        message: "Email or username is required.",
      })
      .max(64, {
        message: "Email or username cannot exceed 64 characters.",
      }),
    password: z
      .string()
      .min(1, {
        message: "Password is required.",
      })
      .max(64, {
        message: "Password cannot exceed 64 characters.",
      }),
  })
  .required();

export const SignupFormSchema = z
  .object({
    first_name: z
      .string()
      .trim()
      .min(1, {
        message: "First name is required.",
      })
      .max(30, {
        message: "First name cannot exceed 30 characters.",
      }),
    last_name: z
      .string()
      .trim()
      .min(1, {
        message: "Last name is required",
      })
      .max(30, {
        message: "Last name cannot exceed 30 characters.",
      }),
    username: z
      .string()
      .trim()
      .min(1, {
        message: "Username is required.",
      })
      .max(30, {
        message: "Username cannot exceed 30 characters.",
      })
      // This single regex handles both rules (starts with letter, then letters/numbers/underscores)
      .regex(/^[A-Za-z][A-Za-z0-9_]*$/, {
        message:
          "Username must start with a letter and can only contain letters, numbers, and underscores.",
      })
      .toLowerCase(),
    email: z
      .string()
      .email({
        message: "Please provide a valid email address.",
      })
      .max(30, {
        message: "Email cannot exceed 30 characters.",
      })
      .toLowerCase(),
    password: z
      .string()
      .min(8, {
        message: "Password must contain at least 8 characters.",
      })
      .max(64, {
        message: "Password cannot exceed 64 characters.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/\d/, {
        message: "Password must contain at least one number.",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character.",
      }),
  })
  .required();

export const VerifyAccountFormSchema = z
  .object({
    code: z.string().length(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  })
  .required();

export const ForgotPasswordFormSchema = z
  .object({
    email: z
      .email({
        error: "Please provide a valid email address.",
      })
      .max(30, {
        error: "Email cannot exceed 30 characters.",
      })
      .toLowerCase(),
  })
  .required();

export const ResetPasswordFormSchema = z
  .object({
    token: z.string().min(1, {
      error: "Please provide a valid token.",
    }),
    password: z
      .string()
      .min(8, {
        error: "Password must contain at least 8 characters.",
      })
      .max(64, {
        error: "Password cannot exceed 64 characters.",
      })
      .regex(/[a-z]/, {
        error: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        error: "Password must contain at least one uppercase letter.",
      })
      .regex(/\d/, {
        error: "Password must contain at least one digit.",
      })
      .regex(/[^A-Za-z0-9]/, {
        error: "Password must contain at least one special character.",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        error: "Password must contain at least 8 characters.",
      })
      .max(64, {
        error: "Password cannot exceed 64 characters.",
      })
      .regex(/[a-z]/, {
        error: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        error: "Password must contain at least one uppercase letter.",
      })
      .regex(/\d/, {
        error: "Password must contain at least one digit.",
      })
      .regex(/[^A-Za-z0-9]/, {
        error: "Password must contain at least one special character.",
      }),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const NewPasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long."),
    // You could add a .regex() here for more strength, e.g., require numbers/symbols
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Show error on the confirm password field
  });

export const ResetPasswordApiSchema = ResetPasswordFormSchema.transform(
  ({ token, password }) => ({
    token,
    password,
  }),
);
