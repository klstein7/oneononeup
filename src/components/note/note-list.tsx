"use client";

import { useNotes } from "~/hooks";
import { NoteItem } from ".";
import { type API } from "~/server/api";

export const NoteList = ({
  meetingId,
  initialNotes,
}: {
  meetingId: string;
  initialNotes: API["meeting"]["find"][number]["notes"];
}) => {
  const notes = useNotes({ meetingId }, initialNotes);

  return (
    <div className="flex flex-col gap-1.5">
      {notes.data.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
};
