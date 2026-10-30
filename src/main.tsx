import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app/app";
import StoreProvider from "./libs/redux/provider";
import Logger from "./libs/logger";
import "./assets/styles/index.css";
import { Snackbar } from "./shared/components";

(globalThis as any).Logger = Logger;
createRoot(document.getElementById("root")!).render(
   <StoreProvider>
      <BrowserRouter>
         <App />
         <Snackbar position="top-center" />
      </BrowserRouter>
   </StoreProvider>,
);
