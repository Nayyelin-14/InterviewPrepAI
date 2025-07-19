import Redis from "ioredis";

const redis = new Redis(
  "rediss://default:AWGIAAIjcDE0ZTUyN2MwOWU1NTI0NzQwOTdkZWFlZDk4MzdmNmZjY3AxMA@comic-grizzly-24968.upstash.io:6379",
  { maxRetriesPerRequest: null }
);
await redis.set("foo", "bar");

export default redis;
