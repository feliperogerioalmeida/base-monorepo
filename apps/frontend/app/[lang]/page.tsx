import { defaultLocale, type Locale, locales } from "@/lib/i18n.config";

import { getNamespace } from "./dictionaries";

const getValidLocale = (lang: string): Locale => {
  return locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
};

interface PageProps {
  params: Promise<{ lang: string }>;
}

const HomePage = async ({ params }: PageProps) => {
  const { lang: langParam } = await params;
  const lang = getValidLocale(langParam);
  const dict = await getNamespace("home", lang);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <h1>{dict.title}</h1>
    </div>
  );
};

export default HomePage;
