import { ThemeSwitcher } from "@/components/theme-switcher";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <div className="fixed top-0 right-0 z-50 p-4">
        <ThemeSwitcher />
      </div>
      <main className="flex min-h-svh items-center justify-center p-4">
        {children}
      </main>
    </>
  );
};

export default AuthLayout;
