import { createClient } from "redis";
import env from "./env";

export const redisClient = createClient({
  url: `redis://${env.redis_user}:${env.redis_pass}@${env.redis_host}:${env.redis_port}`,
});

redisClient.on("connect", () => console.log("Client connected to redis"));
redisClient.on("ready", () => console.log("Redis is ready to use"));
redisClient.on("end", () => console.log("Client disconnected to redis"));
redisClient.on("error", (err) => console.log("Redis Client Error ", err));
process.on("SIGINT", async () => {
  await redisClient.quit();
});
