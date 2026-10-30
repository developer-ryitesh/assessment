import type HttpClient from "@/libs/interceptors";
import type { CreateWorkspaceDTO, RemoveMemberDTO, SendWorkspaceInviteDTO } from "../dtos";

export default class WorkspaceRepository {
   constructor(private _http: HttpClient) {}

   getWorkspaces() {
      return this._http.private.get("/workspace/workspaces");
   }

   createWorkspace(dto: CreateWorkspaceDTO) {
      return this._http.private.post("/workspace/new-workspace", dto);
   }

   getWorkspaceInfo(workspace_id: string) {
      return this._http.private.get(`/workspace/workspaces/${workspace_id}`);
   }

   sendWorkspaceInvite({ workspace_id, user_id }: SendWorkspaceInviteDTO) {
      return this._http.private.post(`/workspace/invite`, {
         workspace_id, //
         user_id,
      });
   }
   removeMembers(removeMemberDTO: RemoveMemberDTO) {
      return this._http.private.delete(`/workspace/remove-member`, {
         data: removeMemberDTO,
      });
   }
}
