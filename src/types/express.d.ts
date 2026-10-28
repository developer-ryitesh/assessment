// types/express.d.ts
import type { Request } from "express";
import type { Socket } from "socket.io";
import { IUser } from "../models/user.model";

declare global {
   namespace Express {
      interface Request {
         user?: IUser; // Assuming UserDocument is the type for your User model
      }
   }
}

declare module "socket.io" {
   interface Socket {
      user?: any | undefined;
   }
}
