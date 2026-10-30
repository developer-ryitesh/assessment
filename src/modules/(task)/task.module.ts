import { Router } from "express";
import TaskController from "./controllers/task.controller";
import TaskService from "./services/task.service";
import TaskRepository from "./repositories/task.repository";
import auth from "../../middlewares/auth.middleware";

export default function TaskModule() {
   const routes = Router();
   const container = new TaskController(new TaskService(new TaskRepository()));
   routes.post("/create-task", [auth], container.createTask);
   routes.get("/tasks/:id", [auth], container.getTasks);
   routes.patch("/change-status", [auth], container.changeStatus);
   return routes;
}
