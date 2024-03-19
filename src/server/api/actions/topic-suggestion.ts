"use server";

import zodToJsonSchema from "zod-to-json-schema";
import { db } from "~/server/db";
import { meetings, topicSuggestions } from "~/server/db/schema";
import { ai } from "~/server/integration";
import {
  TopicSuggestionFindInput,
  TopicSuggestionGenerateInput,
  TopicSuggestionGenerateOutput,
} from "../zod";
import { eq, desc, and, ne } from "drizzle-orm";
import { type z } from "zod";

export const generate = async (
  input: z.infer<typeof TopicSuggestionGenerateInput>,
) => {
  const { meetingId } = TopicSuggestionGenerateInput.parse(input);

  const meeting = await db.query.meetings.findFirst({
    where: eq(meetings.id, meetingId),
    with: {
      notes: true,
    },
  });

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  const previousMeeting = await db.query.meetings.findFirst({
    where: and(
      eq(meetings.dialogueId, meeting.dialogueId),
      ne(meetings.id, meeting.id),
    ),
    with: {
      notes: true,
    },
    orderBy: desc(meetings.createdAt),
  });

  const todos = await db.query.todos.findMany({
    where: eq(meetings.dialogueId, meeting.dialogueId),
  });

  console.log("Generating topic suggestions for meeting", meetingId);
  console.log(JSON.stringify(previousMeeting));
  console.log(previousMeeting?.notes);

  const response = await ai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `
        Your job it to come up with good suggestion topics for a new meeting.
        IMPORTANT: Use the following information to generate the topics:
        Current todo items (in JSON format):
        ${JSON.stringify(todos, null, 2)}
        Current meeting with notes (in JSON format):
        ${JSON.stringify(meeting, null, 2)}
        Previous meeting with notes (in JSON format):
        ${JSON.stringify(previousMeeting, null, 2)}
        IMPORTANT: If there are no todo items or previous meeting, then generate generic helpful topics.
        IMPORTANT: If topics that convey the same intent can be combined, do so.
        IMPORTANT: Do not generate more than 5 topics. Each topic should be short (no more than 100 characters).
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

  await db
    .delete(topicSuggestions)
    .where(eq(topicSuggestions.meetingId, meeting.id));

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
};

export const find = async (input: z.infer<typeof TopicSuggestionFindInput>) => {
  const { meetingId } = TopicSuggestionFindInput.parse(input);

  return db.query.topicSuggestions.findMany({
    where: eq(topicSuggestions.meetingId, meetingId),
  });
};
