import createHttpError from "http-errors";
import UserRepository from "../repositories/user.repository";

export default class UserService {
   constructor(private _userRepository: UserRepository) {}

   async getUsers(query: any) {
      const data = await this._userRepository.getUsers(query);
      return data;
   }
}
