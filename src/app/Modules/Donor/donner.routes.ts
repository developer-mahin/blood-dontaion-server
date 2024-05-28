import { Router } from "express";
import { DonorControllers } from "./donor.controller";
import auth from "../../Middlewares/auth";
import validateRequest from "../../Middlewares/validateRequest";
import { DonorValidation } from "./donor.validation";

const router = Router();

router.get("/donor-list", DonorControllers.getAllDonor);

router.post(
  "/donation-request",
  auth,
  validateRequest(DonorValidation.donationRequestSchema),
  DonorControllers.donationRequest
);

router.get("/donation-request", auth, DonorControllers.getDonationRequest);

router.put(
  "/donation-request/:requestId",
  auth,
  validateRequest(DonorValidation.updateDonationStatus),
  DonorControllers.updateDonationStatus
);

export const DonorRoutes = router;
