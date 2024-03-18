"use server";

import { type z } from "zod";
import { MeetingCreateInput, MeetingFindInput } from "../zod";
import { db } from "~/server/db";
import { desc, eq } from "drizzle-orm";
import { meetings } from "~/server/db/schema";

export const find = (input: z.infer<typeof MeetingFindInput>) => {
  const { dialogueId } = MeetingFindInput.parse(input);

  return db.query.meetings.findMany({
    where: eq(meetings.dialogueId, dialogueId),
  });
};

export const create = async (input: z.infer<typeof MeetingCreateInput>) => {
  const values = MeetingCreateInput.parse(input);

  const previousMeeting = await db.query.meetings.findFirst({
    where: eq(meetings.dialogueId, values.dialogueId),
    orderBy: desc(meetings.createdAt),
  });

  if (previousMeeting) {
  }

  const results = await db.insert(meetings).values(values).returning();

  const meeting = results[0];

  if (!meeting) {
    throw new Error("Failed to create meeting");
  }

  return meeting;
};

export const del = async (meetingId: string) => {
  const results = await db
    .delete(meetings)
    .where(eq(meetings.id, meetingId))
    .returning();

  const meeting = results[0];

  if (!meeting) {
    throw new Error("Failed to delete meeting");
  }

  return meeting;
};
