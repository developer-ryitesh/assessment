import { Router } from "express";
import AuthController from "./controllers/auth.controller";
import AuthService from "./services/auth.service";
import AuthRepository from "./repositories/auth.repository";

export default function AuthModule() {
   const routes = Router();
   const container = new AuthController(new AuthService(new AuthRepository()));
   routes.post("/login", container.login);
   routes.post("/register", container.register);
   routes.get("/refresh-token", container.reAuth);
   return routes;
}
