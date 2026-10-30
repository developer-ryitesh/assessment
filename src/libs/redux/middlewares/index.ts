import { LoggerMiddlewareRedux } from "./logger-middleware.redux";
import { ToastMiddlewareRedux } from "./toast-middleware.redux";

const middlewares = [LoggerMiddlewareRedux, ToastMiddlewareRedux];
export default middlewares;
