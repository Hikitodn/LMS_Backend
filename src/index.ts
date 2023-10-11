import "reflect-metadata";
import app from "./config/express";
import env from "./config/env";
import { connect } from "./config/db_connect";
import { client } from "./config/redis";

// Connect database
connect();
// redis connect
client.connect();

// Run server
app.listen(env.port, () => {
  console.log(`Server started on port ${env.port} in ${env.nodeEnv}`);
});

/**
 * Exports express
 * @public
 */
export default app;
