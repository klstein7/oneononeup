import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { CreateDialogueDialog } from "../dialogue/create-dialogue-dialog";
import { api } from "~/server/api";

export const Sidebar = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["team-members"],
    queryFn: () => api.teamMember.find(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex h-full w-64 flex-col gap-3 border-r p-3">
        <CreateDialogueDialog />
      </div>
    </HydrationBoundary>
  );
};
