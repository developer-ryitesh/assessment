import { Router } from "express";
import DashboardController from "./dashboard.controller";
import DashboardService from "./dashboard.service";
import auth from "../../middlewares/auth.middleware";

export default function DashboardModule() {
   const routes = Router();
   const container = new DashboardController(new DashboardService());
   routes.get("/overview", [auth], container.getOverview);
   return routes;
}
