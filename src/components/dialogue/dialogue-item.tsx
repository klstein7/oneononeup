"use client";

import { type API } from "~/server/api";
import moment from "moment";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useParams, useRouter } from "next/navigation";
import { cn } from "~/lib/utils";

export const DialogueItem = ({
  dialogue,
}: {
  dialogue: API["dialogue"]["find"][number];
}) => {
  const router = useRouter();
  const params = useParams();

  const dialogueId = params.dialogueId as string | undefined;

  return (
    <div
      className={cn(
        "flex cursor-pointer select-none items-center gap-3 rounded-sm border bg-background p-3 transition-all duration-100 ease-in-out hover:bg-secondary/40",
        {
          "border border-foreground/50": dialogueId === dialogue.id,
        },
      )}
      onClick={() => {
        router.push(`/d/${dialogue.id}`);
      }}
    >
      <Avatar className="h-8 w-8 text-sm font-medium">
        <AvatarFallback>{dialogue.teamMember.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <div className="text-sm font-medium">{dialogue.teamMember.name}</div>
        <div className="text-xs text-muted-foreground">
          Updated {moment(dialogue.updatedAt).fromNow()}
        </div>
      </div>
    </div>
  );
};
