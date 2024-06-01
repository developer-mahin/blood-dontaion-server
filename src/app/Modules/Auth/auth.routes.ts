import { Router } from "express";
import validateRequest from "../../Middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
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

router.post(
  "/change-password",
  auth,
  validateRequest(AuthValidation.changePasswordSchema),
  AuthControllers.changePassword
);

export const AuthRoutes = router;
