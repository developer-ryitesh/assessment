import type { RequestHandler } from "express";
import DashboardService from "./dashboard.service";

export default class DashboardController {
   constructor(private _dashboardService: DashboardService) {}

   getOverview: RequestHandler = async (req, res, next) => {
      try {
         const user_id = req.user?._id;

         if (!user_id) {
            res.status(401).json({
               success: false,
               message: "Unauthorized.",
            });
            return;
         }

         const data = await this._dashboardService.getOverview(user_id.toString());

         res.status(200).json({
            success: true,
            message: "Dashboard overview fetched successfully.",
            data,
         });
      } catch (error) {
         next(error);
      }
   };
}
