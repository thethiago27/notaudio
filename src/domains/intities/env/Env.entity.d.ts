declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT: string;
      SENTRY_DSN: string;
      RELEASE: string;
    }
  }
}

export {};
