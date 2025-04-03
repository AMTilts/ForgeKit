import { Header } from "@/components/layout/header";

    export default function AppLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <div className="relative flex min-h-screen flex-col bg-background">
          <Header />
          <main className="flex-1">{children}</main>
          {/* Add Footer here if needed */}
        </div>
      );
    }
