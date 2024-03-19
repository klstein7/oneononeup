"use server";

import { type z } from "zod";
import { MeetingCreateInput, MeetingFindInput } from "../zod";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { meetings } from "~/server/db/schema";
import { api } from "..";

export const find = (input: z.infer<typeof MeetingFindInput>) => {
  const { dialogueId } = MeetingFindInput.parse(input);

  return db.query.meetings.findMany({
    where: eq(meetings.dialogueId, dialogueId),
  });
};

export const create = async (input: z.infer<typeof MeetingCreateInput>) => {
  const values = MeetingCreateInput.parse(input);

  const results = await db.insert(meetings).values(values).returning();

  const meeting = results[0];

  if (!meeting) {
    throw new Error("Failed to create meeting");
  }

  await api.topicSuggestion.generate({
    meetingId: meeting.id,
  });

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

export const get = async (meetingId: string) => {
  const meeting = await db.query.meetings.findFirst({
    where: eq(meetings.id, meetingId),
  });

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  return meeting;
};
