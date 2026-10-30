export interface IWorkspaceModel {
   _id: string;
   name: string;
   slug: string;
   description: string;
   avatar: string;
   owner: {
      _id: string;
      email: string;
      avatar: string;
   };
   members?: IMembereModel[];
   createdAt: string;
   updatedAt: string;
   __v: number;
}

export interface IMembereModel {
   _id: string;
   email: string;
   avatar: string;
   joined_at: string;
}
