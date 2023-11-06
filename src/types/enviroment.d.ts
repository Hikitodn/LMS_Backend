declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Enviroment
      NODE_ENV: "development" | "production";
      PORT?: string;

      // JWT
      JWT_ACCESS_TOKEN: string;
      JWT_REFRESH_TOKEN: string;
      JWT_EXPIRATION_MINUTES: string;

      // SQL
      DB_NAME: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;

      // Redis
      REDIS_PORT: string;
      REDIS_HOST: string;
      REDIS_USER: string;
      REDIS_PASS: string;
    }
  }
}

export {};
