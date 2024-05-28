import { Router } from "express";
import { AuthRoutes } from "../Modules/Auth/auth.routes";
import { DonorRoutes } from "../Modules/Donor/donner.routes";

const router = Router();

const allRoutes = [
  {
    path: "/",
    route: AuthRoutes,
  },
  {
    path: "/",
    route: DonorRoutes,
  },
];

allRoutes.forEach((item) => {
  router.use(item.path, item.route);
});

export default router;
