"use client";

import { useMeetings } from "~/hooks";
import { MeetingItem } from ".";
import Image from "next/image";

export const MeetingList = ({ dialogueId }: { dialogueId: string }) => {
  const meetings = useMeetings({ dialogueId });

  if (meetings.data.length === 0) {
    return (
      <div className="flex items-center justify-center p-6">
        <Image
          src="/img/no-meetings.png"
          width={275}
          height={275}
          alt="No meetings"
          className="antialiased opacity-30 saturate-0"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {meetings.data.map((meeting) => (
        <MeetingItem key={meeting.id} meeting={meeting} />
      ))}
    </div>
  );
};
