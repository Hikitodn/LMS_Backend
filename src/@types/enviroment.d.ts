declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: string;
      JWT_SECRET: string;
      JWT_EXPIRATION_INTERVAL: string;
    }
  }
}

export {};
