import "~/styles/globals.css";

import { Jost as FontSans } from "next/font/google";
import { Providers } from "./providers";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { api } from "~/server/api";
import { CreateDialogueDialog, DialogueList } from "~/components/dialogue";
import { Toaster } from "~/components/ui";
import { RightSidebar } from "~/components/layout";

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
    queryKey: ["team-members"],
    queryFn: () => api.teamMember.find(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["dialogues"],
    queryFn: () => api.dialogue.find(),
  });

  return (
    <html lang="en" className="dark">
      <body className={font.className}>
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="mx-auto flex h-screen w-full max-w-7xl p-3">
              <div className="flex h-full w-80 flex-col gap-3 p-3">
                <CreateDialogueDialog />
                <DialogueList />
              </div>
              <main className="flex-1 border-x">{children}</main>
              <RightSidebar />
            </div>
            <Toaster />
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
