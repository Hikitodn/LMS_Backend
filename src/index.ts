import env from "./config/env";
import app from "./config/express";
import "reflect-metadata";

// Run server
app.listen(env.port, () => {
  console.log(`Server started on port ${env.port} in ${env.nodeEnv}`);
});

/**
 * Exports express
 * @public
 */
export default app;
