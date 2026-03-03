import { VerifyEmailCard } from "@workspace/auth/components/verify-email-card";

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
    <VerifyEmailCard
      labels={dict.verifyEmail}
      token={token}
      signInHref="/sign-in"
    />
  );
};

export default Page;
