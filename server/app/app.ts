import express from "express";
import { renderView } from "../libs/render-view";
import appRoutes from "./routes";
import createHttpError from "http-errors";
import globalError from "../middlewares/error.middleware";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => setTimeout(next, 1000));
app.use("/api/v1", appRoutes());
renderView(app);

// Error handler
app.use(async (req, res, next) => next(createHttpError.NotFound()));
app.use(globalError);

export default app;
