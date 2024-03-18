"use client";

import { type API } from "~/server/api";
import moment from "moment";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useRouter } from "next/navigation";

export const DialogueItem = ({
  dialogue,
}: {
  dialogue: API["dialogue"]["find"][number];
}) => {
  const router = useRouter();
  return (
    <div
      className="flex cursor-pointer select-none items-center gap-3 rounded-sm border bg-secondary/25 p-3 hover:bg-secondary/40"
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
