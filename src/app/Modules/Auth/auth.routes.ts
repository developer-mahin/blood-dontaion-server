import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../Middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import auth from "../../Middlewares/auth";

const router = Router();

router.post(
  "/register",
  validateRequest(AuthValidation.userRegistrationSchema),
  AuthControllers.userRegistration
);

router.post(
  "/login",
  validateRequest(AuthValidation.userLoginSchema),
  AuthControllers.userLogin
);

router.get("/my-profile", auth, AuthControllers.myProfile);

router.put(
  "/my-profile",
  auth,
  validateRequest(AuthValidation.userProfileSchema),
  AuthControllers.updateMyProfile
);

export const AuthRoutes = router;
