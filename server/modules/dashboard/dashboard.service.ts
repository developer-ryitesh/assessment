import mongoose from "mongoose";
import TaskModel from "../../models/task.model";
import WorkspaceModel from "../../models/workspace.model";
import MemberModel from "../../models/member.model";

export default class DashboardService {
   async getOverview(user_id: string) {
      const userObjectId = new mongoose.Types.ObjectId(user_id);

      // Find joined workspaces
      const memberships = await MemberModel.find({
         user_id: userObjectId,
      })
         .select("workspace_id")
         .lean();

      // Find owned workspaces
      const ownedWorkspaces = await WorkspaceModel.find({
         owner_id: userObjectId,
      })
         .select("_id")
         .lean();

      // Merge and remove duplicate workspace IDs
      const workspaceIds = [...new Map([...memberships.map((item) => item.workspace_id), ...ownedWorkspaces.map((item) => item._id)].map((id) => [id.toString(), id])).values()];

      // Get task statistics
      const [taskStats, totalMembers] = await Promise.all([
         TaskModel.aggregate([
            {
               $match: {
                  workspace_id: { $in: workspaceIds },
               },
            },
            {
               $group: {
                  _id: "$status",
                  count: { $sum: 1 },
               },
            },
         ]),

         MemberModel.countDocuments({
            workspace_id: { $in: workspaceIds },
         }),
      ]);

      const getCount = (status: string) => taskStats.find((item) => item._id === status)?.count ?? 0;

      const todo = getCount("todo");
      const inProgress = getCount("in_progress");
      const completed = getCount("completed");
      const cancelled = getCount("cancelled");

      return {
         overview: {
            totalWorkspaces: workspaceIds.length,
            ownedWorkspaces: ownedWorkspaces.length,
            joinedWorkspaces: workspaceIds.length - ownedWorkspaces.length,
            totalTasks: todo + inProgress + completed + cancelled,
            completedTasks: completed,
            pendingTasks: todo + inProgress,
            totalMembers,
         },
      };
   }
}
