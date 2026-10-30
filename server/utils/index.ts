import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const validId = (id: string) => {
   if (!isValidObjectId(id)) {
      throw new createHttpError.BadRequest("Invalid id");
   }
   return id;
};
