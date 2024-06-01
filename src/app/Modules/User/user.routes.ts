import { Router } from "express";
import auth from "../../Middlewares/auth";
import { UserControllers } from "./user.controller";
import validateRequest from "../../Middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = Router();

router.get("/my-profile", auth, UserControllers.myProfile);

router.put(
  "/my-profile",
  auth,
  validateRequest(UserValidation.updateUserProfileSchema),
  UserControllers.updateMyProfile
);

export const UserRoutes = router;
