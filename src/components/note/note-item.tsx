"use client";

import { type API } from "~/server/api";

export const NoteItem = ({ note }: { note: API["note"]["find"][number] }) => {
  return (
    <div className="flex items-center gap-3 rounded bg-secondary/50 p-3 text-sm">
      <div>{note.content}</div>
    </div>
  );
};
