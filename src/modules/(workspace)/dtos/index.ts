/*------------ Workspace DTOS----------*/
export type CreateWorkspaceDTO = {
   name: string;
   description: string;
   avatar?: string;
};
export type SendWorkspaceInviteDTO = {
   user_id: string;
   workspace_id: string;
};
export type RemoveMemberDTO = {
   user_id: string;
   workspace_id: string;
};
