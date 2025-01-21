import { ThemeSwitcher } from "@/components/theme-switcher";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-between">
      <div className="flex flex-row justify-end h-10 w-full p-4">
        <ThemeSwitcher/>
      </div>
      {children}
      <div className="h-10">
      </div>
    </div>
  );
}
