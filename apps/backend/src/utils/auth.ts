import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  bearer,
  haveIBeenPwned,
  openAPI,
  twoFactor,
} from "better-auth/plugins";

import { APP_NAME, CORS_ORIGIN } from "@/config/env.js";
import { db } from "@/db/index.js";
import { sendEmail } from "@/utils/send-email.js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
    revokeSessionsOnPasswordReset: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
    sendOnSignUp: true,
  },
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
  },
  trustedOrigins: CORS_ORIGIN.split(","),
  appName: APP_NAME,
  plugins: [
    openAPI(),
    bearer(),
    twoFactor({
      issuer: APP_NAME,
      backupCodeOptions: {
        storeBackupCodes: "encrypted",
      },
    }),
    haveIBeenPwned({
      customPasswordCompromisedMessage:
        "Your password might been exposed, Please choose a more secure password.",
    }),
  ],
});
