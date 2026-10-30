import createHttpError from "http-errors";
import TaskRepository from "../repositories/task.repository";

export default class TaskService {
   // @ts-ignore
   constructor(private _taskRepository: TaskRepository) {}

   method = async (body: any) => {
      if (!body || !body.email || !body.password) {
         throw new createHttpError.BadRequest();
      }
      return body;
   };
}
