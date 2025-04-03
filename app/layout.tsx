import type { Metadata } from "next";
    import { Inter } from "next/font/google";
    import { ClerkProvider } from '@clerk/nextjs'
    import "./globals.css";

    const inter = Inter({ subsets: ["latin"] });

    export const metadata: Metadata = {
      title: "ForgeKit - Generate Code & Content Instantly", // Updated title
      description: "Use YAML templates and GitHub repos to create boilerplate code, documentation, and more.", // Updated description
    };

    // This RootLayout now primarily provides Clerk context and base HTML structure
    export default function RootLayout({
      children,
    }: Readonly<{
      children: React.ReactNode;
    }>) {
      return (
        <ClerkProvider>
          <html lang="en" suppressHydrationWarning> {/* Added suppressHydrationWarning */}
            <body className={inter.className}>
              {children}
            </body>
          </html>
        </ClerkProvider>
      );
    }
