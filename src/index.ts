import env from "./config/env";
import app from "./config/express";

app.listen(env.port, () => {
  console.log(`Server started on port ${env.port} in ${env.nodeEnv}`);
});
