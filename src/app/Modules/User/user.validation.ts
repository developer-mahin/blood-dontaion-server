import { z } from "zod";

const updateUserProfileSchema = z.object({
  body: z.object({
    age: z
      .number({ required_error: "Age field is required." })
      .int()
      .optional(),
    bio: z.string({ invalid_type_error: "Bio field is required." }).optional(),
    lastDonationDate: z
      .string({ required_error: "LastDonationDate field is required." })
      .regex(/^\d{2}-\d{2}-\d{4}$/, {
        message: "Invalid date format. Date should be in DD-MM-YYYY format",
      })
      .optional(),
    contactNumber: z
      .string({ invalid_type_error: "contactNumber field is required." })
      .optional(),
    photo: z
      .string({ invalid_type_error: "photo field is required." })
      .optional(),
  }),
});

export const UserValidation = {
  updateUserProfileSchema,
};
