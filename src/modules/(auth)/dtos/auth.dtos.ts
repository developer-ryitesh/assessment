import { z } from "zod";

export const loginSchema = z
   .object({
      email: z //
         .string()
         .email("Invalid email format"),
      password: z //
         .string()
         .min(6, "Password must be at least 6 characters"),
   })
   .strict();
export type LoginDTO = z.infer<typeof loginSchema>;

export const registerSchema = z
   .object({
      email: z //
         .string("Email is required!")
         .email("Invalid email address"),

      password: z //
         .string("Password is required")
         .min(8, "Password must be at least 8 characters"),

      confirm_password: z //
         .string("Confirm password is required"),
   })
   .refine((data) => data.password === data.confirm_password, {
      message: "Passwords do not match",
      path: ["confirm_password"],
   })
   .strict();

export type RegisterDTO = z.infer<typeof registerSchema>;
