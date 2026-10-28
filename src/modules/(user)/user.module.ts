import { Router } from "express";
import UserController from "./controllers/user.controller";
import UserService from "./services/user.service";
import UserRepository from "./repositories/user.repository";
import auth from "../../middlewares/auth.middleware";

export default function UserModule() {
   const routes = Router();
   const container = new UserController(new UserService(new UserRepository()));
   routes.get("/session", [auth], container.session);
   routes.get("/logout", [auth], container.logout);
   routes.get("/users", [auth], container.getUsers);
   return routes;
}
