export interface ISessionModel {
   _id: string;
   email: string;
   password: string;
   avatar: string;
   role: "ADMIN" | "USER";
   createdAt: Date;
   updatedAt: Date;
}
