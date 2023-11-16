import "reflect-metadata";
import app from "./config/express";
import env from "./config/env";
import { db_connect } from "./config/db_connect";
import { redisClient } from "./config/redis";

// Connect database
db_connect();
// redis connect
redisClient.connect();

// Run server
app.listen(env.port, () => {
  console.log(`Server started on port ${env.port} in ${env.nodeEnv}`);
});

/**
 * Exports express
 * @public
 */
export default app;
