"use client";

import { type API } from "~/server/api";
import { cn } from "~/lib/utils";

export const NoteItem = ({ note }: { note: API["note"]["find"][number] }) => {
  return (
    <div className="flex items-center gap-3 rounded p-3">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-muted-foreground" />
        <div className="text-lg">{note.content}</div>
      </div>
    </div>
  );
};
