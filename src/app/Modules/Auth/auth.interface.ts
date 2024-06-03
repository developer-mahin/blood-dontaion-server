import { BloodGroup } from "@prisma/client";

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  bloodType: BloodGroup;
  location: string;
  isDonate: boolean;
};

export type TChangePassword = {
  currentPassword: string;
  newPassword: string;
};
