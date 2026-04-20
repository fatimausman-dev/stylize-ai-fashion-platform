import dotenv from "dotenv";

dotenv.config();
export const config = {
  // General config
  NODE_ENV: process.env.NODE_ENV ?? "development",
  DATABASE_URL: process.env.DATABASE_URL ?? "",
  PORT: process.env.PORT ?? 8080,

  ADMIN_AUTH_NAME: process.env.BASIC_AUTH_NAME ?? "admin",
  ADMIN_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD ?? "admin",

  JWT_SESSION_SECRET_KEY: process.env.JWT_SESSION_SECRET_KEY ?? "secret",
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY ?? "secret",
  JWT_AUTH_SECRET_KEY: process.env.JWT_AUTH_SECRET_KEY ?? "secret",
  JWT_FORGET_SECRET_KEY: process.env.JWT_FORGET_SECRET_KEY ?? "secret",

  // Stripe config
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? "secret",
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY ?? "secret",

  // Twilio config
  TWILLIO_ACCOUNT_SID: process.env.TWILLIO_ACCOUNT_SID ?? "",
  TWILLIO_AUTH_TOKEN: process.env.TWILLIO_AUTH_TOKEN ?? "",
};

export default config;
