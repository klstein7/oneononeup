import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Plus } from "lucide-react";
import moment from "moment";
import { unstable_noStore as noStore } from "next/cache";
import { CreateMeetingDialog, MeetingList } from "~/components/meeting";
import { Button } from "~/components/ui";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { toTitleCase } from "~/lib/utils";

import { api } from "~/server/api";

export default async function DialoguePage({
  params: { dialogueId },
}: {
  params: {
    dialogueId: string;
  };
}) {
  noStore();

  const queryClient = new QueryClient();

  const meetings = await api.meeting.find({ dialogueId });

  await queryClient.prefetchQuery({
    queryKey: ["meetings", { dialogueId }],
    queryFn: () => api.meeting.find({ dialogueId }),
    initialData: meetings,
  });

  const dialogue = await api.dialogue.get(dialogueId);

  return (
    <div className="flex h-full flex-col gap-3 p-3">
      <div className="flex flex-col gap-1.5">
        <div className="flex gap-1.5">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="text-xl font-medium">
                {dialogue.teamMember.name}
              </div>
              <Badge variant="outline" className="font-normal">
                {toTitleCase(dialogue.teamMember.type)}
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div>Created {moment(dialogue.createdAt).fromNow()}</div>
              <div>&middot;</div>
              <div>Updated {moment(dialogue.updatedAt).fromNow()}</div>
            </div>
          </div>
          <CreateMeetingDialog dialogueId={dialogueId} />
        </div>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MeetingList dialogueId={dialogueId} />
      </HydrationBoundary>
    </div>
  );
}
