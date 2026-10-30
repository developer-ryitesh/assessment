import { snackbar } from "@/shared/components";
import type { Middleware } from "@reduxjs/toolkit";

//=store=>(next)
export const ToastMiddlewareRedux: Middleware = (_) => (next) => (action: any) => {
   if (action?.type.endsWith("/fulfilled") && !action?.type?.includes("!")) {
      snackbar({
         title: action?.payload?.message,
         type: "DONE",
         action: {
            label: "",
            onClick: () => null,
         },
      });
   }
   if (action?.type.endsWith("/rejected") && !action?.type?.includes("!")) {
      const error = action?.payload;
      snackbar({
         body: error.response?.data?.error?.message || error?.message,
         type: "ERROR",
         action: {
            label: "",
            onClick: () => null,
         },
      });
   }
   return next(action);
};
