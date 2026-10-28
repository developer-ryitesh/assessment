import type { Response, CookieOptions } from "express";
import ENV from "../../configs/env";

type DurationUnit = "d" | "h" | "m" | "s";
type CookieDuration = `${number}-${DurationUnit}`;

type CookieValue = string;

export default function httpCookie(res: Response) {
   const expires = (duration: CookieDuration): Date => {
      const [valueStr, unit] = duration.split("-");
      const value = Number(valueStr);

      if (!Number.isFinite(value) || value <= 0) {
         throw new Error("Invalid duration value");
      }

      const unitMs: Record<DurationUnit, number> = {
         d: 24 * 60 * 60 * 1000,
         h: 60 * 60 * 1000,
         m: 60 * 1000,
         s: 1000,
      };

      const ms = unitMs[unit as DurationUnit];

      if (!ms) {
         throw new Error("Invalid duration unit. Use d, h, m, or s.");
      }

      return new Date(Date.now() + value * ms);
   };

   const options = (expiresAt?: Date): CookieOptions => {
      const isProduction = process.env.NODE_ENV === "production";

      return {
         httpOnly: true,
         secure: isProduction,
         sameSite: isProduction ? "none" : "lax",
         ...(expiresAt && { expires: expiresAt }),
      };
   };

   const set = (cookies: Record<string, CookieValue>): void => {
      const expiresAt = expires(ENV.REFRESH_TOKEN_EXPIRES_IN as CookieDuration);

      for (const [key, value] of Object.entries(cookies)) {
         res.cookie(key, value, options(expiresAt));
      }
   };

   const remove = (key: string): void => {
      res.clearCookie(key, options());
   };

   return { set, remove };
}
