import "~/styles/globals.css";

import { Jost as FontSans } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "~/components/ui";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { api } from "~/server/api";

const font = FontSans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "One-on-one up",
  description: "Level up your one on one meetings",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["dialogues"],
    queryFn: () => api.dialogue.find(),
  });

  return (
    <html lang="en" className="light">
      <body className={font.className}>
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex h-screen">
              <div className="flex-1">{children}</div>
            </div>
            <Toaster />
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
