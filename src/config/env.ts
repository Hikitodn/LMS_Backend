import path from "path";
import * as dotenv from "dotenv";

// import .env variables
dotenv.config({ path: path.join(__dirname, "../../.env") });

export default {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,

  // JWT
  jwtAccessToken: process.env.JWT_ACCESS_TOKEN,
  jwtRefreshToken: process.env.JWT_REFRESH_TOKEN,
  jwtExpirationMinutes: process.env.JWT_EXPIRATION_MINUTES,

  // SQL
  db_name: process.env.DB_NAME,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
};
