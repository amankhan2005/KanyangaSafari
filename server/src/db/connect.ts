import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export async function connectDatabase(uri: string) {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10_000 });
  console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
}

export function databaseStatus(): "connected" | "disconnected" | "connecting" | "disconnecting" {
  const states: Record<number, "connected" | "disconnected" | "connecting" | "disconnecting"> = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  return states[mongoose.connection.readyState] ?? "disconnected";
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}
