import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import notFound from "./app/Middlewares/notFound";
import globalErrorHandler from "./app/Middlewares/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://blooddonationclient.vercel.app",
    // origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "Welcome To The Blood Donation Server",
  });
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
