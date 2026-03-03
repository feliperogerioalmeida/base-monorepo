import { ResetPasswordForm } from "@workspace/auth/components/reset-password-form";

import { getNamespace } from "@/app/[lang]/dictionaries";
import { getValidLocale } from "@/app/[lang]/layout";

interface PageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ token?: string }>;
}

const Page = async ({ params, searchParams }: PageProps) => {
  const lang = getValidLocale((await params).lang);
  const dict = await getNamespace("auth", lang);
  const token = (await searchParams).token ?? "";

  return (
    <ResetPasswordForm
      labels={dict.resetPassword}
      token={token}
      signInHref="/sign-in"
      successRedirect="/sign-in"
    />
  );
};

export default Page;
