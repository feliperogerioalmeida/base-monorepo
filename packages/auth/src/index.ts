export { authClient } from "./client";
export {
  ForgotPasswordForm,
  ResetPasswordForm,
  SignInForm,
  SignUpForm,
  TwoFactorForm,
  VerifyEmailCard,
} from "./components/index";
export {
  createForgotPasswordSchema,
  createResetPasswordSchema,
  createSignInSchema,
  createSignUpSchema,
  createTwoFactorSchema,
} from "./schemas/index";
export type {
  AuthDictionary,
  ForgotPasswordFormLabels,
  ForgotPasswordFormProps,
  ForgotPasswordValidation,
  ResetPasswordFormLabels,
  ResetPasswordFormProps,
  ResetPasswordValidation,
  SignInFormLabels,
  SignInFormProps,
  SignInValidation,
  SignUpFormLabels,
  SignUpFormProps,
  SignUpValidation,
  TwoFactorFormLabels,
  TwoFactorFormProps,
  TwoFactorValidation,
  VerifyEmailCardLabels,
  VerifyEmailCardProps,
} from "./types";
