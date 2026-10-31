export interface ISessionModel {
   _id: string;
   email: string;
   password: string;
   avatar: string;
   role: "ADMIN" | "USER";
   createdAt: Date;
   updatedAt: Date;
}

export interface IDashboardModel {
   overview: {
      totalWorkspaces: number;
      ownedWorkspaces: number;
      joinedWorkspaces: number;
      totalTasks: number;
      completedTasks: number;
      pendingTasks: number;
      totalMembers: number;
   };
}
