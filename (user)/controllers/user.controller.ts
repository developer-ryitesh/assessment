import type { RequestHandler } from "express";
import UserService from "../services/user.service";
import httpCookie from "../../../libs/cookie";

export default class UserController {
   constructor(private _userService: UserService) {}

   session: RequestHandler = async (req, res, next) => {
      try {
         res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: req.user,
         });
      } catch (error) {
         next(error);
      }
   };

   getUsers: RequestHandler = async (req, res, next) => {
      try {
         const query = req?.query;
         const users = await this._userService.getUsers(query);
         res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
         });
      } catch (error) {
         next(error);
      }
   };

   logout: RequestHandler = async (req, res, next) => {
      try {
         const cookie = httpCookie(res);
         cookie.remove("refreshToken");
         res.status(200).json({
            message: "logout successfully",
            data: {},
            success: true,
         });
      } catch (error) {
         next(error);
      }
   };
}
