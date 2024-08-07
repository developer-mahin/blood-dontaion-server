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
  auth(UserRole.ADMIN, UserRole.DONOR),
  UserControllers.getSingleUser
);

router.get(
  "/my-profile",
  auth(UserRole.ADMIN, UserRole.DONOR),
  UserControllers.myProfile
);

router.patch(
  "/update-profile",
  auth(UserRole.ADMIN, UserRole.DONOR),
  validateRequest(UserValidation.updateUserProfileSchema),
  UserControllers.updateMyProfile
);

router.patch(
  "/update-status/:id",
  auth(UserRole.ADMIN),
  UserControllers.updateProfileStatus
);

router.patch(
  "/update-role/:id",
  auth(UserRole.ADMIN),
  UserControllers.updateProfileRole
);

router.delete(
  "/delete-user/:id",
  auth(UserRole.ADMIN),
  UserControllers.deleteUser
);

export const UserRoutes = router;
