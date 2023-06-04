import { UndefinedEnvVariableError } from "@presentation/errors";
import * as Sentry from "@sentry/node";

class SentryClient {
  private static instance: SentryClient;

  private constructor() {
    if (!process.env.SENTRY_DSN) {
      throw new UndefinedEnvVariableError("SENTRY_DSN");
    }
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      release: process.env.RELEASE,
      maxValueLength: 1000
    });
  }
  public static getInstance(): SentryClient {
    if (!SentryClient.instance) {
      SentryClient.instance = new SentryClient();
    }

    return SentryClient.instance;
  }

  public captureException(error: string): void {
    Sentry.captureException(error);
  }
}

export default SentryClient;
