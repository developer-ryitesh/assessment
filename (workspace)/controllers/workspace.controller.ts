import type { RequestHandler } from "express";
import WorkspaceService from "../services/workspace.service";
import { createWorkspaceSchema, updateWorkspaceSchema } from "../dtos/workspace.dtos";
import { validate } from "../../../libs/zod";
import MemberService from "../services/member.service";
import { validId } from "../../../utils";

export default class WorkspaceController {
   constructor(
      private _workspaceService: WorkspaceService,
      private _memberService: MemberService,
   ) {}

   createWorkspace: RequestHandler = async (req, res, next) => {
      try {
         const body = validate(createWorkspaceSchema, req.body);
         const result = await this._workspaceService.createWorkspace({
            ...body,
            owner_id: req.user?._id || "",
         });
         res.status(201).json({
            success: true,
            message: "Workspace created successfully",
            data: result,
         });
      } catch (error) {
         next(error);
      }
   };

   getWorkspaces: RequestHandler = async (req, res, next) => {
      try {
         const result = await this._workspaceService.getWorkspaces(req.user?._id as string);
         res.status(201).json({
            success: true,
            message: "Workspace updated successfully",
            data: result,
         });
      } catch (error) {
         next(error);
      }
   };

   updateWorkspace: RequestHandler = async (req, res, next) => {
      try {
         const workspace_id = req.params.id;
         const body = validate(updateWorkspaceSchema, req.body);
         const result = await this._workspaceService.updateWorkspace({
            workspace_id: workspace_id as string,
            owner_id: req.user?._id as string,
            data: body,
         });
         res.status(201).json({
            success: true,
            message: "Workspace updated successfully",
            data: result,
         });
      } catch (error) {
         next(error);
      }
   };

   deleteWorkspace: RequestHandler = async (req, res, next) => {
      try {
         const workspace_id = req.params.id;
         const result = await this._workspaceService.deleteWorkspace({
            workspace_id: workspace_id as string,
            owner_id: req.user?._id as string,
         });
         res.status(201).json({
            success: true,
            message: "Workspace deleted successfully",
            data: result,
         });
      } catch (error) {
         next(error);
      }
   };

   // members
   addMembers: RequestHandler = async (req, res, next) => {
      try {
         const { user_id, workspace_id } = req.body;
         const result = await this._memberService.addMember({
            user_id: validId(user_id),
            workspace_id: validId(workspace_id),
         });
         res.status(201).json({
            success: true,
            message: "Workspace updated successfully",
            data: result,
         });
      } catch (error) {
         next(error);
      }
   };

   removeMember: RequestHandler = async (req, res, next) => {
      try {
         const { user_id, workspace_id } = req.body;
         const result = await this._memberService.removeMember({
            user_id: validId(user_id),
            workspace_id: validId(workspace_id),
         });

         res.status(200).json({
            success: true,
            message: "Workspace member removed successfully",
            data: result,
         });
      } catch (error) {
         next(error);
      }
   };
}
