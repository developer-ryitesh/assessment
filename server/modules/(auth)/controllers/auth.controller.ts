import type { RequestHandler } from "express";
import AuthService from "../services/auth.service";
import { validate } from "../../../libs/zod";
import { registerSchema } from "../dtos/auth.dtos";
import httpCookie from "../../../libs/cookie";

export default class AuthController {
   constructor(private _auth: AuthService) {}

   register: RequestHandler = async (req, res, next) => {
      try {
         const body = validate(registerSchema, req.body);
         await this._auth.register(body);
         res.status(201).json({
            message: "User registered successfully",
         });
      } catch (error) {
         next(error);
      }
   };

   login: RequestHandler = async (req, res, next) => {
      try {
         const body = req.body;
         const { refreshToken, accessToken } = await this._auth.login(body);
         const cookie = httpCookie(res);
         cookie.set({ refreshToken });
         res.status(200).json({
            message: "login successfully",
            data: { accessToken },
            success: true,
         });
      } catch (error) {
         next(error);
      }
   };

   reAuth: RequestHandler = async (req, res, next) => {
      try {
         const refreshToken = req.cookies?.refreshToken;
         const { accessToken } = await this._auth.reAuth(refreshToken);
         res.status(200).json({
            success: true,
            message: "Reauth successfully",
            data: { accessToken },
         });
      } catch (error) {
         next(error);
      }
   };
}
