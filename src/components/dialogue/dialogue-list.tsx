"use client";

import { useDialogues } from "~/hooks";
import { DialogueItem } from "./dialogue-item";

export const DialogueList = () => {
  const dialogues = useDialogues();

  return (
    <div className="flex flex-col gap-3">
      {dialogues.data.map((dialogue) => (
        <DialogueItem key={dialogue.id} dialogue={dialogue} />
      ))}
    </div>
  );
};
