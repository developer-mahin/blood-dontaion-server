import { Router } from "express";
import auth from "../../Middlewares/auth";
import { UserControllers } from "./user.controller";
import validateRequest from "../../Middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { UserRole } from "@prisma/client";

const router = Router();

router.get("/get-all-user", auth(UserRole.ADMIN), UserControllers.getAllUser);
router.get(
  "/get-single-user/:id",
  auth(UserRole.ADMIN),
  UserControllers.getSingleUser
);

router.get(
  "/my-profile",
  auth(UserRole.ADMIN, UserRole.DONOR),
  UserControllers.myProfile
);

router.put(
  "/update-profile",
  auth(UserRole.ADMIN, UserRole.DONOR),
  validateRequest(UserValidation.updateUserProfileSchema),
  UserControllers.updateMyProfile
);

export const UserRoutes = router;
