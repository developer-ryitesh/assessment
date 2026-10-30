import type HttpClient from "@/libs/interceptors";
import type { LoginDTO, RegisterDTO } from "../dtos/auth.dto";

export default class AuthRepository {
   constructor(private _http: HttpClient) {}

   login = async (body: LoginDTO) => {
      return await this._http.public.post("/auth/login", body);
   };

   register = async (body: RegisterDTO) => {
      return await this._http.public.post("/auth/register", body);
   };
}
