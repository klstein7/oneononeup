"use client";

import { useDialogues } from "~/hooks";
import { DialogueItem } from "./dialogue-item";
import { useRef, type ComponentPropsWithoutRef, useEffect } from "react";
import { cn } from "~/lib/utils";
import autoAnimate from "@formkit/auto-animate";

export const DialogueList = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => {
  const animateRef = useRef<HTMLDivElement>(null);
  const dialogues = useDialogues();

  useEffect(() => {
    if (animateRef.current) {
      autoAnimate(animateRef.current);
    }
  }, [animateRef]);

  return (
    <div
      ref={animateRef}
      className={cn("flex flex-col gap-3", className)}
      {...props}
    >
      {dialogues.data.map((dialogue) => (
        <DialogueItem key={dialogue.id} dialogue={dialogue} />
      ))}
    </div>
  );
};
