"use server";

import { type z } from "zod";
import {
  MeetingCreateInput,
  MeetingFindInput,
  TopicSuggestionGenerateOutput,
} from "../zod";
import { db } from "~/server/db";
import { desc, eq } from "drizzle-orm";
import { meetings, topicSuggestions } from "~/server/db/schema";
import { ai } from "~/server/integration";
import zodToJsonSchema from "zod-to-json-schema";

export const find = (input: z.infer<typeof MeetingFindInput>) => {
  const { dialogueId } = MeetingFindInput.parse(input);

  return db.query.meetings.findMany({
    where: eq(meetings.dialogueId, dialogueId),
    with: {
      topicSuggestions: true,
    },
  });
};

export const create = async (input: z.infer<typeof MeetingCreateInput>) => {
  const values = MeetingCreateInput.parse(input);

  const previousMeeting = await db.query.meetings.findFirst({
    where: eq(meetings.dialogueId, values.dialogueId),
    orderBy: desc(meetings.createdAt),
  });

  const todos = await db.query.todos.findMany({
    where: eq(meetings.dialogueId, values.dialogueId),
  });

  const results = await db.insert(meetings).values(values).returning();

  const meeting = results[0];

  if (!meeting) {
    throw new Error("Failed to create meeting");
  }

  console.log("Generating topic suggestions for meeting", meeting.id);

  const response = await ai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `
        Your job it to come up with good suggestion topics for a new meeting.
        IMPORTANT: Use the following information to generate the topics:
        IMPORTANT: If the following information is not available, generate generic and useful topics.
        IMPORTANT: If topics that convey the same intent can be combined, do so.
        Current todo items (in JSON format):
        ${JSON.stringify(todos, null, 2)}
        Previous meeting (in JSON format):
        ${JSON.stringify(previousMeeting, null, 2)}
        IMPORTANT: Do not generate more than 5 topics.
      `,
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "generate_topic_suggestions",
          description: "Generate topic suggestions for a meeting",
          parameters: zodToJsonSchema(TopicSuggestionGenerateOutput),
        },
      },
    ],
    tool_choice: {
      type: "function",
      function: {
        name: "generate_topic_suggestions",
      },
    },
  });

  console.log("Generated topic suggestions for meeting", meeting.id, response);

  const toolCalls = response.choices[0]?.message.tool_calls ?? [];

  await Promise.all(
    toolCalls.map(async (toolCall) => {
      if (toolCall.function.name !== "generate_topic_suggestions") {
        return;
      }

      const { topics } = TopicSuggestionGenerateOutput.parse(
        JSON.parse(toolCall.function.arguments),
      );

      await db
        .insert(topicSuggestions)
        .values(topics.map((t) => ({ ...t, meetingId: meeting.id })));
    }),
  );

  console.log("Generated topic suggestions for meeting", meeting.id, "done");

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
