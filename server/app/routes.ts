import { Router } from "express";
import pkg from "../../package.json";
import AuthModule from "../modules/(auth)/auth.module";
import UserModule from "../modules/(user)/user.module";
import WorkspaceModule from "../modules/(workspace)/workspace.module";
import TaskModule from "../modules/(task)/task.module";
import DashboardModule from "../modules/dashboard/dashboard.module";

export default function appRoutes() {
   const routes = Router();
   routes.get("/", (req, res, next) => {
      res.status(200).json({
         message: "App info",
         data: {
            name: pkg.name,
            tagline: "Tasks that move with you",
            version: pkg.version,
            status: "running",
         },
         success: true,
      });
   });
   routes.use("/auth", AuthModule());
   routes.use("/user", UserModule());
   routes.use("/workspace", WorkspaceModule());
   routes.use("/task", TaskModule());
   routes.use("/dashboard", DashboardModule());
   return routes;
}
