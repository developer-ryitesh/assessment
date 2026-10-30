import createHttpError from "http-errors";
import UserModel from "../../../models/user.model";

export default class UserRepository {
   async getUsers(query: any) {
      try {
         const dbQuery: any = {};
         if (query?.search) {
            dbQuery.$or = [
               { fullname: { $regex: query?.search, $options: "i" } }, //
               { email: { $regex: query?.search, $options: "i" } },
            ];
         }
         const data = await UserModel.find(dbQuery).select("-__v").limit(20); // optional limit
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   }

   async validUser(id: string) {
      const data = await UserModel.findById(id);
      return data;
   }
}
