import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { LeftSidebar, RightSidebar } from "~/components/layout";
import { api } from "~/server/api";

export default async function DialogueLayout({
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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex h-screen w-full overflow-hidden">
        <LeftSidebar />
        <main className="flex-1 overflow-y-auto border-x scrollbar scrollbar-track-background scrollbar-thumb-muted">
          {children}
        </main>
        <RightSidebar />
      </div>
    </HydrationBoundary>
  );
}
