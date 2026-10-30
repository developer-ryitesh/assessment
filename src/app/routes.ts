import { Router } from "express";
import pkg from "../../package.json";
import AuthModule from "../modules/(auth)/auth.module";
import UserModule from "../modules/(user)/user.module";
import WorkspaceModule from "../modules/(workspace)/workspace.module";
import TaskModule from "../modules/(task)/task.module";

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
            description: pkg.description,
            author: pkg.author,
         },
         success: true,
      });
   });
   routes.use("/auth", AuthModule());
   routes.use("/user", UserModule());
   routes.use("/workspace", WorkspaceModule());
   routes.use("/task", TaskModule());
   return routes;
}
