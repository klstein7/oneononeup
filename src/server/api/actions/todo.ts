"use server";

import { type z } from "zod";
import { TodoGenerateInput, TodoGenerateOutput } from "../zod";
import { ai } from "~/server/integration";
import { zodToJsonSchema } from "zod-to-json-schema";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { dialogues } from "~/server/db/schema";

export const generate = async (input: z.infer<typeof TodoGenerateInput>) => {
  const { meetings, dialogueId } = TodoGenerateInput.parse(input);

  const dialogue = await db.query.dialogues.findFirst({
    where: eq(dialogues.id, dialogueId),
    with: {
      teamMember: true,
    },
  });

  if (!dialogue) {
    throw new Error("Dialogue not found");
  }

  const { teamMember } = dialogue;

  console.log("Team member", teamMember);

  console.log("Generating todo items based on meetings", meetings);

  const response = await ai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `
        Your job is to assist the user in generating todo items based on the notes from a selection of meetings.
        The todo items should be actionable and specific.
        The name of the team member is: ${teamMember.name}.
        The relation of the team member to me is: ${teamMember.type}.
        Here are the notes from the meetings (in JSON format):
        ${JSON.stringify(meetings, null, 2)}
      `,
      },
    ],
    tool_choice: {
      type: "function",
      function: {
        name: "generate_todo_items",
      },
    },
    tools: [
      {
        type: "function",
        function: {
          name: "generate_todo_items",
          description:
            "Generates todo items based on the notes from a selection of meetings.",
          parameters: zodToJsonSchema(TodoGenerateOutput),
        },
      },
    ],
  });

  console.log("Response from AI", response);

  const toolCalls = response.choices[0]?.message.tool_calls;

  if (!toolCalls) {
    throw new Error("Failed to generate todo items");
  }

  console.log("Tool calls", toolCalls);

  return toolCalls.map((toolCall) => {
    if (toolCall.function.name === "generate_todo_items") {
      const { todos } = TodoGenerateOutput.parse(
        JSON.parse(toolCall.function.arguments),
      );
      return todos;
    }
    return [];
  });
};
