import type { Interceptor, Req, Res, Instance } from "./types";

export default class ErrorInterceptor implements Interceptor {
   public instance: Instance;

   constructor(instance: Instance) {
      this.instance = instance;
   }

   private extractError(e: any) {
      return (
         e?.response?.data ?? {
            message: e?.message ?? "Something went wrong",
            status: e?.response?.status,
         }
      );
   }
   intercept(req: Req, res: Res): Instance {
      req.use(
         (config) => config,
         (error) => Promise.reject(error),
      );

      res.use(
         (response) => response,
         (error) => Promise.reject(this.extractError(error)),
      );

      return this.instance;
   }
}
