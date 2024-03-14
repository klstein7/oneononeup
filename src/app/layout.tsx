import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { Sidebar } from "~/components/ui/sidebar";
import { Providers } from "./providers";
import { Toaster } from "~/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "One-on-one up",
  description: "Level up your one on one meetings",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${inter.variable}`}>
        <Providers>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
