import { z } from "zod";

const donationRequestSchema = z.object({
  body: z.object({
    donorId: z
      .string()
      .uuid()
      .min(1, { message: "Donor ID is required and must be a valid UUID." }),
    phoneNumber: z
      .string()
      .regex(/^\d{11}$/, { message: "Phone number must contain 11 digits." }),
    dateOfDonation: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, {
      message: "Date of donation must be in the format DD-MM-YYYY.",
    }),
    hospitalName: z.string().min(1, { message: "Hospital name is required." }),
    hospitalAddress: z
      .string()
      .min(1, { message: "Hospital address is required." }),
    reason: z.string().min(1, { message: "Reason for donation is required." }),
  }),
});

const updateDonationStatusSchema = z.object({
  body: z.object({
    requestStatus: z.enum(["PENDING", "APPROVED", "REJECTED"]).or(z.string()),
  }),
});

export const DonorValidation = {
  donationRequestSchema,
  updateDonationStatus: updateDonationStatusSchema,
};
