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
  body: z.object({
    name: z.string({ required_error: "Name field is required." }),
    email: z
      .string({ required_error: "Email must be a valid email address." })
      .email(),
    password: z.string({ required_error: "Password field is required." }),
    bloodType: BloodType,
    location: z.string({ required_error: "Location field is required." }),
    age: z.number({ required_error: "Age field is required." }).int(),
    bio: z.string({ invalid_type_error: "Bio field is required." }),
    lastDonationDate: z
      .string({ required_error: "LastDonationDate field is required." })
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Invalid date format. Date should be in YYYY-MM-DD format",
      }),
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
  body: z.object({
    oldPassword: z.string({ required_error: "oldPassword field is required." }),
    newPassword: z.string({ required_error: "newPassword field is required." }),
  }),
});

export const AuthValidation = {
  userRegistrationSchema,
  userLoginSchema,
  changePasswordSchema,
};
