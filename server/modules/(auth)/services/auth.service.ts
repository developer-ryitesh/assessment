import { LoginDTO, loginSchema, RegisterDTO } from "../dtos/auth.dtos";
import createHttpError from "http-errors";
import AuthRepository from "../repositories/auth.repository";
import bcrypt, { genSalt, hash } from "bcrypt";
import JWT from "../../../libs/jwt";

export default class AuthService {
   constructor(private _auth: AuthRepository) {}

   register = async (body: RegisterDTO) => {
      const user = await this._auth.findUserByEmail(body.email);
      if (user) {
         throw createHttpError.BadRequest("email already exists!");
      }
      const salt = await genSalt();
      const hashedPassword = await hash(body.password, salt);
      const data = await this._auth.createUser({
         email: body.email,
         password: hashedPassword,
      });
      return data;
   };

   login = async (body: LoginDTO) => {
      if (!body || !body.email || !body.password) {
         throw new createHttpError.BadRequest();
      }
      const user = await this._auth.findUserByEmail(body.email);
      if (!user) {
         throw createHttpError.NotFound("User not found");
      }
      const match = await bcrypt.compare(body.password, user.password);
      if (!match) {
         throw createHttpError.Unauthorized();
      }
      const accessToken = JWT.createToken({
         data: { id: user.id },
         exp: String(process.env.ACCESS_TOKEN_EXPIRES_IN),
      });

      const refreshToken = JWT.createToken({
         data: { id: user.id },
         exp: String(process.env.REFRESH_TOKEN_EXPIRES_IN),
      });
      return { accessToken, refreshToken };
   };

   async reAuth(refreshToken: string) {
      if (!refreshToken) {
         throw new createHttpError.NotFound("Refresh token not found");
      }
      const token = await JWT.verifyToken(refreshToken);
      const user = await this._auth.findUserById(token.id);
      if (!user) {
         throw new createHttpError.Unauthorized();
      }
      const accessToken = JWT.createToken({
         data: { id: user.id },
         exp: String(process.env.ACCESS_TOKEN_EXPIRES_IN),
      });
      return { accessToken };
   }
}
