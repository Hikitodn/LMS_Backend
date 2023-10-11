import { createClient } from "redis";
import env from "./env";

export const client = createClient({
  url: `redis://${env.redis_user}:${env.redis_pass}@${env.redis_host}:${env.redis_port}`,
});

client.on("connect", () => console.log("Client connected to redis"));
client.on("ready", () => console.log("Redis is ready to use"));
client.on("end", () => console.log("Client disconnected to redis"));
client.on("error", (err) => console.log("Redis Client Error ", err));
process.on("SIGINT", async () => {
  await client.quit();
});
