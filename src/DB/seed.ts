import { BloodGroup, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import Config from "../app/Config";
import prisma from "../app/utils/prisma";

export const seedAdmin = async () => {
  try {
    const isExistAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.ADMIN,
      },
    });

    if (isExistAdmin) {
      console.log("Admin is already exist!!");
      return;
    }

    const hashPassword = await bcrypt.hash(Config.admin_pass!, 10);

    const createAdmin = await prisma.$transaction(async (transactionClient) => {
      const newUser = await transactionClient.user.create({
        data: {
          email: Config.admin_email!,
          password: hashPassword,
          role: UserRole.ADMIN,
          name: "Mahin Khan",
          bloodType: BloodGroup.AB_NEGATIVE,
          location: "Dhaka",
        },
      });

      await transactionClient.userProfile.create({
        data: {
          userId: newUser.id,
          bio: "",
          age: 12,
        },
      });

      console.log(newUser);
    });

    console.log("Admin created successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};
