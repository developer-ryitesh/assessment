import type HttpClient from "@/libs/interceptors";
import type { CreateTaskDTO, MoveStoryDTO } from "../dtos";

export default class TaskRepository {
   // @ts-ignore
   constructor(private _http: HttpClient) {}

   getTasks(workspace_id: string) {
      return this._http.private.get(`/task/tasks/${workspace_id}`);
   }

   moveStory(dto: MoveStoryDTO) {
      return this._http.private.patch("/task/change-status", {
         status: dto.status,
         position: dto.position,
         tasks_id: dto._id,
      });
   }

   createTask(dto: CreateTaskDTO) {
      return this._http.private.post("/task/create-task", {
         title: dto.title,
         description: dto.description,
         type: dto.type,
         priority: dto.priority,
         user_id: dto.user_id,
         estimate_hours: dto.estimate_hours,
         workspace_id: dto.workspace_id,
      });
   }
}
