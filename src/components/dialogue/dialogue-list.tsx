"use client";

import { useDialogues } from "~/hooks";
import { DialogueItem } from "./dialogue-item";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "~/lib/utils";

export const DialogueList = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className }, ref) => {
  const dialogues = useDialogues();

  if(dialogues.data.length > 0) {
    return (
      <div ref={ref} className={cn("flex flex-col gap-3", className)}>
        {dialogues.data.map((dialogue) => (
          <DialogueItem key={dialogue.id} dialogue={dialogue} />
        ))}
      </div>
    );
  }

  return null;
});

DialogueList.displayName = "DialogueList";
