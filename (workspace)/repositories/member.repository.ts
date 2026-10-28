import createHttpError from "http-errors";
import MemberModel from "../../../models/member.model";
import { AddMemberDTO } from "../dtos/member.dto";
import UserModel from "../../../models/user.model";
import WorkspaceModel from "../../../models/workspace.model";

export default class WorkspaceMemberRepository {
   async addMember({ workspace_id, user_id }: AddMemberDTO) {
      try {
         const result = await MemberModel.create({
            workspace_id,
            user_id,
         });
         return result;
      } catch (error: unknown) {
         throw new createHttpError.InternalServerError("Failed to add workspace member");
      }
   }

   async hasMember({ workspace_id, user_id }: { workspace_id: string; user_id: string }) {
      try {
         const result = await MemberModel.findOne({
            $and: [{ workspace_id }, { user_id }],
         }).lean();
         return result;
      } catch (error: unknown) {
         throw new createHttpError.InternalServerError();
      }
   }

   async getMemberInfo(user_id: string) {
      try {
         const user = await UserModel.findById(user_id).lean();
         return user;
      } catch (error: unknown) {
         throw new createHttpError.InternalServerError();
      }
   }

   async removeMember({ workspace_id, user_id }: { workspace_id: string; user_id: string }) {
      try {
         const result = await MemberModel.findOneAndDelete({
            $and: [{ workspace_id }, { user_id }],
         }).lean();
         return result;
      } catch (error: unknown) {
         throw new createHttpError.InternalServerError("Failed to remove workspace member");
      }
   }

   async getWorkspaceInfo(workspace_id: string) {
      try {
         const workspace = await WorkspaceModel.findById(workspace_id).lean();
         return workspace;
      } catch (error: unknown) {
         throw new createHttpError.InternalServerError();
      }
   }
}
