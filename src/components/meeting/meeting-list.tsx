"use client";

import { useMeetings } from "~/hooks";
import { MeetingItem } from ".";
import Image from "next/image";
import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";

export const MeetingList = ({ dialogueId }: { dialogueId: string }) => {
  const animateRef = useRef<HTMLDivElement>(null);
  const meetings = useMeetings({ dialogueId });

  useEffect(() => {
    if (animateRef.current) {
      autoAnimate(animateRef.current);
    }
  }, [animateRef]);

  if (meetings.data.length === 0) {
    return (
      <div className="flex items-center justify-center p-6">
        <Image
          src="/img/no-meetings.png"
          width={325}
          height={325}
          alt="No meetings"
          className="antialiased opacity-25 saturate-0 dark:opacity-15 dark:invert"
        />
      </div>
    );
  }

  return (
    <div ref={animateRef} className="flex flex-col gap-3">
      {meetings.data.map((meeting) => (
        <MeetingItem key={meeting.id} meeting={meeting} />
      ))}
    </div>
  );
};
