import createHttpError from "http-errors";
import type { RequestHandler } from "express";
import JWT from "../libs/jwt";
import UserModel from "../models/user.model";

const auth: RequestHandler = async (req, res, next) => {
   try {
      const accessToken =
         req?.cookies?.accessToken || //
         req.headers["authorization"]?.split("Bearer ")[1] ||
         req.headers["authorization"]?.split("bearer ")[1];

      if (!accessToken) {
         throw createHttpError.Unauthorized("You are unauthorized");
      }
      const verify = await JWT.verifyToken(accessToken);
      const user = await UserModel.findById(verify.id);
      if (!user) {
         throw createHttpError.Unauthorized("User not found");
      }
      // @ts-ignore
      req.user = user;
      next();
   } catch (error: unknown) {
      if (error instanceof Error) {
         if (error.name === "TokenExpiredError") {
            return next(createHttpError.Unauthorized("Token has expired. Please login again."));
         }

         if (error.name === "JsonWebTokenError") {
            return next(createHttpError.Unauthorized("Invalid authentication token."));
         }
      }

      next(error);
   }
};

export default auth;
