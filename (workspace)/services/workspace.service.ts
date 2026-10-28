import { CreateWorkspaceDTO, DeleteWorkspaceDTO, UpdatWorkspaceDTO } from "../dtos/workspace.dtos";
import WorkspaceRepository from "../repositories/workspace.repository";

export default class WorkspaceService {
   constructor(private _workspaceRepository: WorkspaceRepository) {}

   createWorkspace = async (dto: CreateWorkspaceDTO) => {
      const result = await this._workspaceRepository.createWorkspace(dto);
      return result;
   };

   getWorkspaces = async (user_id: string) => {
      const result = await this._workspaceRepository.getWorkspaces(user_id);
      return result;
   };
   updateWorkspace = async (dto: UpdatWorkspaceDTO) => {
      const result = await this._workspaceRepository.updateWorkspace(dto);
      return result;
   };

   async deleteWorkspace(dto: DeleteWorkspaceDTO) {
      const result = await this._workspaceRepository.deleteWorkspace(dto);
      return result;
   }
}
