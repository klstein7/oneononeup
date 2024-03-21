"use client";

import { useNotes } from "~/hooks";
import { NoteItem } from ".";
import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";

export const NoteList = ({ meetingId }: { meetingId: string }) => {
  const animateRef = useRef<HTMLDivElement>(null);
  const notes = useNotes({ meetingId });

  useEffect(() => {
    if (animateRef.current) {
      autoAnimate(animateRef.current);
    }
  }, [animateRef]);

  return (
    <div ref={animateRef} className="flex flex-col gap-1.5">
      {notes.data.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
};
