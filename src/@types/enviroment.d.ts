declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Enviroment
      NODE_ENV: "development" | "production";
      PORT?: string;

      // JWT
      JWT_SECRET: string;
      JWT_EXPIRATION_INTERVAL: string;

      // SQL
      DB_NAME: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
    }
  }
}

export {};
