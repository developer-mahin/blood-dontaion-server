import { Router } from "express";
import { AuthRoutes } from "../Modules/Auth/auth.routes";
import { DonorRoutes } from "../Modules/Donor/donner.routes";
import { UserRoutes } from "../Modules/User/user.routes";

const router = Router();

const allRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/donor",
    route: DonorRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
];

allRoutes.forEach((item) => {
  router.use(item.path, item.route);
});

export default router;
