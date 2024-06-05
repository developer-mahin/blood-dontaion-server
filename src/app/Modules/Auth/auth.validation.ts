import { z } from "zod";

const BloodType = z.enum([
  "A_POSITIVE",
  "A_NEGATIVE",
  "B_POSITIVE",
  "B_NEGATIVE",
  "AB_POSITIVE",
  "AB_NEGATIVE",
  "O_POSITIVE",
  "O_NEGATIVE",
]);

const userRegistrationSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "Name field is required." }),
      email: z
        .string({ required_error: "Email must be a valid email address." })
        .email(),
      password: z.string({ required_error: "Password field is required." }),
      confirmPassword: z.string({
        required_error: "confirmPassword field is required.",
      }),
      bloodType: BloodType,
      location: z.string({ required_error: "Location field is required." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
});

const userLoginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email must be a valid email address." })
      .email(),
    password: z.string({ required_error: "Password field is required." }),
  }),
});

const changePasswordSchema = z.object({
  body: z
    .object({
      currentPassword: z
        .string()
        .min(6, "Password must be at least 6 characters"),
      newPassword: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z
        .string()
        .min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
});

export const AuthValidation = {
  userRegistrationSchema,
  userLoginSchema,
  changePasswordSchema,
};
