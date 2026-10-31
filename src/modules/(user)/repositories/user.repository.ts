import type HttpClient from "@/libs/interceptors";

export default class UserRepository {
   constructor(private _http: HttpClient) {}

   getSession = async () => {
      return await this._http.private.get("/user/session");
   };

   userLogout = async () => {
      return await this._http.private.get("/user/logout");
   };

   getUsers = async () => {
      return await this._http.private.get("/user/users");
   };
   getDashboard = async () => {
      return await this._http.private.get("/dashboard/overview");
   };
}
