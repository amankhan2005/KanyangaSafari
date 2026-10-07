import { env } from "./config/env.js";
import { connectDatabase, disconnectDatabase } from "./db/connect.js";
import { createApp } from "./app.js";

async function main() {
  try {
    await connectDatabase(env.MONGODB_URI);
  } catch (err) {
    console.error("Could not connect to MongoDB. Check MONGODB_URI.", err instanceof Error ? err.message : err);
    process.exit(1);
  }

  const server = createApp().listen(env.PORT, () => {
    console.log(`Kanyanga API listening on port ${env.PORT} (${env.NODE_ENV})`);
  });

  const shutdown = (signal: string) => {
    console.log(`${signal} received, shutting down`);
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  };
  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

main();
