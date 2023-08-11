import "reflect-metadata";
import env from "./config/env";
import app from "./config/express";
import db from "./config/db_connect";

// Connect database
db.connect();

// Run server
app.listen(env.port, () => {
  console.log(`Server started on port ${env.port} in ${env.nodeEnv}`);
});

/**
 * Exports express
 * @public
 */
export default app;
