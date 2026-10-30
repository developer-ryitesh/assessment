import type { RequestHandler } from "express";
import TaskService from "../services/task.service";
import { validate } from "../../../libs/zod";
import { createTaskSchema } from "../dtos/task.dtos";
import createHttpError from "http-errors";
import WorkspaceModel from "../../../models/workspace.model";
import MemberModel from "../../../models/member.model";
import TaskModel from "../../../models/task.model";
import { ZodError } from "zod";
import { validId } from "../../../utils";

export default class TaskController {
   constructor(private _taskService: TaskService) {}

   createTask: RequestHandler = async (req, res, next) => {
      try {
         const body = validate(createTaskSchema, req.body);
         const user_id = req.user?._id;
         const workspace = await WorkspaceModel.exists({
            _id: body.workspace_id,
         });
         if (!workspace) {
            throw new createHttpError.NotFound("Workspace not found");
         }
         // Verify that the authenticated user belongs to this workspace.
         const isMember = await MemberModel.exists({
            workspace_id: body.workspace_id,
            user_id,
         });

         if (!isMember) {
            throw new createHttpError.Forbidden("You are not a member of this workspace");
         }

         const task = await TaskModel.create({
            ...body,
            workspace_id: body.workspace_id,
            user_id,
         });

         res.status(201).json({
            message: "Task created successfully",
            data: task,
         });
      } catch (error) {
         if (error instanceof ZodError) {
            return next(new createHttpError.BadRequest(error.issues.map((issue) => issue.message).join(", ")));
         }
         next(error);
      }
   };

   getTasks: RequestHandler = async (req, res, next) => {
      try {
         const workspace_id = validId(req.params.id as string);
         const { status, priority } = req.query;
         const user_id = req.user?._id;

         if (!user_id) {
            throw new createHttpError.Unauthorized("Authentication required");
         }

         const isMember = await MemberModel.exists({
            workspace_id,
            user_id,
         });

         if (!isMember) {
            throw new createHttpError.Forbidden("You are not a member of this workspace");
         }

         const filter: Record<string, unknown> = {
            workspace_id,
         };

         if (status) filter.status = status;
         if (priority) filter.priority = priority;

         const tasks = await TaskModel.find(filter) //
            .sort({ position: 1, createdAt: -1 })
            .lean();

         res.status(200).json({
            message: "Tasks fetched successfully",
            data: tasks,
         });
      } catch (error) {
         next(error);
      }
   };

   changeStatus: RequestHandler = async (req, res, next) => {
      try {
         const tasks_id = validId(req.body.tasks_id);
         const status = req.body.status;
         const position = req.body.position;

         const task = await TaskModel.findById(tasks_id);
         if (!task) {
            throw new createHttpError.NotFound("Task not found");
         }

         const isMember = await MemberModel.exists({
            workspace_id: task.workspace_id,
            user_id: req.user?._id as string,
         });

         if (!isMember) {
            throw new createHttpError.Forbidden("You are not a member of this workspace");
         }

         task.status = status;
         task.completed_at = status === "completed" ? new Date() : null;
         task.position = position;
         await task.save();

         res.status(200).json({
            message: "Task status updated successfully",
            data: task,
         });
      } catch (error) {
         if (error instanceof ZodError) {
            return next(new createHttpError.BadRequest(error.issues.map((issue) => issue.message).join(", ")));
         }
         next(error);
      }
   };
}
