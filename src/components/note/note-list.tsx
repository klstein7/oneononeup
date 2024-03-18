"use client";

import { useNotes } from "~/hooks";
import { NoteItem } from ".";

export const NoteList = ({ meetingId }: { meetingId: string }) => {
  const notes = useNotes({ meetingId });

  return (
    <div className="flex flex-col gap-1.5">
      {notes.data.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
};
