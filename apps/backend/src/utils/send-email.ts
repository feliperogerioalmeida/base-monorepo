import type { SendEmailParams } from "@/domain/email.js";

export const sendEmail = async ({ to, subject, text }: SendEmailParams) => {
  console.log("--- EMAIL ---");
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${text}`);
  console.log("--- END EMAIL ---");
};
