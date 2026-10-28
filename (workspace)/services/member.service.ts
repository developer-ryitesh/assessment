import createHttpError from "http-errors";
import { AddMemberDTO } from "../dtos/member.dto";
import MemberRepository from "../repositories/member.repository";
import { validId } from "../../../utils";

export default class MemberService {
   constructor(private _memberRepository: MemberRepository) {}

   addMember = async ({ user_id, workspace_id }: AddMemberDTO) => {
      if (!user_id || !workspace_id) {
         throw new createHttpError.BadRequest("Invalid user ID or workspace ID");
      }
      const user = await this._memberRepository.getMemberInfo(user_id);
      if (!user) {
         throw new createHttpError.NotFound("User not found!");
      }
      const workspace = await this._memberRepository.getWorkspaceInfo(workspace_id);
      if (!workspace) {
         throw new createHttpError.NotFound("Workspace not found!");
      }
      const isMemberExist = await this._memberRepository.hasMember({
         workspace_id,
         user_id,
      });
      if (isMemberExist) {
         throw new createHttpError.Conflict("User is already a member of this workspace");
      }
      const result = await this._memberRepository.addMember({
         user_id: validId(user_id),
         workspace_id: validId(workspace_id),
      });
      return result;
   };

   removeMember = async ({ user_id, workspace_id }: AddMemberDTO) => {
      if (!user_id || !workspace_id) {
         throw new createHttpError.BadRequest("Invalid user ID or workspace ID");
      }
      const user = await this._memberRepository.getMemberInfo(user_id);
      if (!user) {
         throw new createHttpError.NotFound("User not found!");
      }
      const workspace = await this._memberRepository.getWorkspaceInfo(workspace_id);
      if (!workspace) {
         throw new createHttpError.NotFound("Workspace not found!");
      }
      const isMemberExist = await this._memberRepository.hasMember({
         workspace_id,
         user_id,
      });

      if (!isMemberExist) {
         throw new createHttpError.NotFound("User is not a member of this workspace");
      }
      const result = await this._memberRepository.removeMember({
         user_id: validId(user_id),
         workspace_id: validId(workspace_id),
      });
      return result;
   };
}
