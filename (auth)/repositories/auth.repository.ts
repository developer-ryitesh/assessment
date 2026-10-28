import createHttpError from "http-errors";
import UserModel from "../../../models/user.model";
import { RegisterDTO } from "../dtos/auth.dtos";

export default class AuthRepository {
   async createUser({ email, password }: Omit<RegisterDTO, "confirm_password">) {
      try {
         const data = await UserModel.create({
            email, //
            password,
            avatar: "https://cdn-icons-png.flaticon.com/512/219/219988.png",
         });
         return data;
      } catch (error) {
         console.log(error);

         throw new createHttpError.InternalServerError("InternalServerError");
      }
   }

   async findUserByEmail(email: string) {
      try {
         const data = await UserModel.findOne({ email }).select("+password").exec();
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   }

   async findUserById(id: string) {
      try {
         const data = await UserModel.findById(id).select("-__v");
         return data;
      } catch (error) {
         throw new createHttpError.InternalServerError("InternalServerError");
      }
   }
}
