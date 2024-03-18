"use server";

import { type z } from "zod";
import { ActionGenerateInput, ActionGenerateOutput } from "../zod";
import { ai } from "~/server/integration";
import { zodToJsonSchema } from "zod-to-json-schema";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { dialogues } from "~/server/db/schema";

export const generate = async (input: z.infer<typeof ActionGenerateInput>) => {
  const { notes, dialogueId } = ActionGenerateInput.parse(input);

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

  console.log("Generating action items based on notes", notes);

  const response = await ai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `
        Your job is to assist the user in generating action items based on the notes from a selection of meetings.
        The action items should be actionable and specific.
        The name of the team member is ${teamMember.name}.
        The relation to the team member is ${teamMember.type}.
        Here are the notes from the meetings (in JSON format):
        ${JSON.stringify(notes, null, 2)}
      `,
      },
    ],
    tool_choice: {
      type: "function",
      function: {
        name: "generate_action_items",
      },
    },
    tools: [
      {
        type: "function",
        function: {
          name: "generate_action_items",
          description:
            "Generates action items based on the notes from a selection of meetings.",
          parameters: zodToJsonSchema(ActionGenerateOutput),
        },
      },
    ],
  });

  console.log("Response from AI", response);

  const toolCalls = response.choices[0]?.message.tool_calls;

  if (!toolCalls) {
    throw new Error("Failed to generate action items");
  }

  console.log("Tool calls", toolCalls);

  toolCalls.forEach((toolCall) => {
    if (toolCall.function.name === "generate_action_items") {
      console.log(toolCall.function.arguments);
    }
  });
};
