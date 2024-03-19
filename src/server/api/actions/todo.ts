"use server";

import { type z } from "zod";
import {
  TodoCreateInput,
  TodoCreateManyInput,
  TodoFindInput,
  TodoGenerateInput,
  TodoGenerateOutput,
  TodoUpdateInput,
} from "../zod";
import { ai } from "~/server/integration";
import { zodToJsonSchema } from "zod-to-json-schema";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { dialogues, meetings, todos } from "~/server/db/schema";

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

  const currentTodos = await db.query.todos.findMany({
    where: eq(todos.dialogueId, dialogueId),
  });

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
        IMPORTANT: When possible, try to combine notes into a singular actionable todo item.

        Here are the notes from the meetings (in JSON format):
        ${JSON.stringify(meetings, null, 2)}

        Here are the current todo items (in JSON format):
        ${JSON.stringify(currentTodos, null, 2)}

        IMPORTANT: Do not generate todos if an existing todo item already exists with the same intent.
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

  for (const toolCall of toolCalls) {
    if (toolCall.function.name === "generate_todo_items") {
      const { todos } = TodoGenerateOutput.parse(
        JSON.parse(toolCall.function.arguments),
      );
      return todos;
    }
  }

  return [];
};

export const create = async (
  input: z.infer<typeof TodoCreateInput>
) => {
  const value = TodoCreateInput.parse(input);

  const results = await db.insert(todos).values(value).returning();

  const todo = results[0];

  if(!todo){
    throw new Error("Failed to create todo");
  }

  return todo;
}

export const createMany = async (
  input: z.infer<typeof TodoCreateManyInput>,
) => {
  const values = TodoCreateManyInput.parse(input);

  console.log(values);

  return db.insert(todos).values(values).returning();
};

export const find = async (input: z.infer<typeof TodoFindInput>) => {
  const { dialogueId } = TodoFindInput.parse(input);

  return db.query.todos.findMany({
    where: eq(todos.dialogueId, dialogueId),
  });
};

export const update = async (
  todoId: string,
  input: z.infer<typeof TodoUpdateInput>,
) => {
  const values = TodoUpdateInput.parse(input);

  const results = await db
    .update(todos)
    .set(values)
    .where(eq(todos.id, todoId))
    .returning();

  const todo = results[0];

  if (!todo) {
    throw new Error("Failed to update todo");
  }

  return todo;
};

export const del = async (todoId: string) => {
  const results = await db
    .delete(todos)
    .where(eq(todos.id, todoId))
    .returning();
  
  const todo = results[0];

  if (!todo) {
    throw new Error("Failed to delete todo");
  }
  return todo;
}
