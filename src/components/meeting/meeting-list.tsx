"use client";

import { useMeetings } from "~/hooks";
import { MeetingItem } from ".";

export const MeetingList = ({ dialogueId }: { dialogueId: string }) => {
  const meetings = useMeetings({ dialogueId });

  if (meetings.data.length === 0) {
    return (
      <div>
        <div className="text-sm">No meetings found.</div>
        <div className="text-xs text-muted-foreground">
          Create a meeting to get started!
        </div>
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
