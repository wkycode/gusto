import redis, { createClient } from "redis";

const redisClient = await createClient({
  url: "redis://redis:6379",
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

export default redisClient;
