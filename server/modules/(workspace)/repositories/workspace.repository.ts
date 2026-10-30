import createHttpError from "http-errors";
import WorkspaceModel from "../../../models/workspace.model";
import { CreateWorkspaceDTO, DeleteWorkspaceDTO, UpdatWorkspaceDTO } from "../dtos/workspace.dtos";
import slugify from "slugify";
import MemberModel from "../../../models/member.model";

export default class WorkspaceRepository {
   async createWorkspace(dto: CreateWorkspaceDTO) {
      try {
         const data = await WorkspaceModel.create({
            name: dto.name,
            slug: slugify(dto.name, {
               strict: true,
            }),
            description: dto.description,
            avatar: dto.avatar,
            owner_id: dto.owner_id,
         });
         await MemberModel.create({
            workspace_id: data._id,
            user_id: data.owner_id,
         });
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError();
      }
   }

   async getWorkspaces(user_id: string) {
      try {
         const data = await MemberModel.find({
            user_id: user_id,
         })
            .populate({
               path: "workspace_id",
               populate: { path: "owner_id", select: "username email avatar" },
            })
            .select("__user_id")
            .sort({ created_at: -1 })
            .lean()
            .exec();

         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("Failed to fetch owner workspaces");
      }
   }

   async getWorkspaceInfo(user_id: string, workspace_id: string) {
      try {
         const data = await MemberModel.findOne({
            user_id,
            workspace_id,
         })
            .populate({
               path: "workspace_id",
               populate: {
                  path: "owner_id",
                  select: "username email avatar",
               },
            })
            .select("__user_id")
            .lean()
            .exec();

         if (!data) {
            throw new createHttpError.NotFound("Workspace not found");
         }

         return data;
      } catch (error) {
         if (createHttpError.isHttpError(error)) throw error;
         throw new createHttpError.InternalServerError("Failed to fetch workspace information");
      }
   }
   async updateWorkspace({ owner_id, workspace_id, data }: UpdatWorkspaceDTO) {
      try {
         const updateData: any = {};
         if (data.name) {
            updateData.name = data.name;
            updateData.slug = slugify(data.name, { strict: true });
         }
         if (data.description) updateData.description = data.description;
         if (data.avatar) updateData.avatar = data.description;
         const result = await WorkspaceModel.findOneAndUpdate(
            { _id: workspace_id, owner_id: owner_id }, //
            { $set: updateData },
            { new: true, runValidators: true },
         ).exec();
         if (!result) {
            throw new createHttpError.NotFound("Workspace not found or you are not the owner");
         }
         return result;
      } catch (error) {
         if (error instanceof createHttpError.HttpError) {
            throw error;
         }
         throw new createHttpError.InternalServerError("Failed to update workspace");
      }
   }

   async deleteWorkspace({ owner_id, workspace_id }: DeleteWorkspaceDTO) {
      try {
         const result = await WorkspaceModel.findOneAndDelete({
            _id: workspace_id,
            owner_id,
         }).exec();

         if (!result) {
            throw new createHttpError.NotFound("Workspace not found or you are not the owner");
         }
         await MemberModel.deleteMany({
            workspace_id,
         }).exec();

         return result;
      } catch (error) {
         if (error instanceof createHttpError.HttpError) {
            throw error;
         }
         throw new createHttpError.InternalServerError("Failed to delete workspace");
      }
   }
}
