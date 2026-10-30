import http from "http";
import app from "./app/app";
import connect2DB from "./database";
import ENV from "./configs/env";

const PORT = ENV.PORT ? Number(process.env.PORT) : 8000;
connect2DB();
const server = http.createServer(app);

server.listen(PORT, () => {
   console.log(`Server listening on http://localhost:${PORT}/api/v1`);
});

// Graceful shutdown
const shutdown = (signal: string) => {
   console.log(`Received ${signal}, shutting down...`);
   server.close(() => {
      console.log("HTTP server closed.");
      process.exit(0);
   });

   // force exit after 10s
   setTimeout(() => {
      console.error("Forcing shutdown.");
      process.exit(1);
   }, 10_000).unref();
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
