import path from "path";
import * as dotenv from "dotenv";

// import .env variables
dotenv.config({ path: path.join(__dirname, "../../.env") });

export default {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_INTERVAL,
};
