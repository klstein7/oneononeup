import { z } from "zod";
import { Note } from "./note";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { todos } from "~/server/db/schema";
import { Meeting } from ".";

export const Todo = createSelectSchema(todos, {
  title: (schema) => schema.title.describe("A very short title for the todo"),
  description: (schema) =>
    schema.description.describe("A description of the todo. 1-2 sentences."),
}).pick({
  title: true,
  description: true,
});

export const TodoGenerateInput = z.object({
  dialogueId: z.string(),
  meetings: z.array(Meeting.extend({ notes: z.array(Note) })),
});

export const TodoGenerateOutput = z.object({
  todos: z.array(Todo),
});

export const TodoCreateInput = createInsertSchema(todos).pick({
  title: true,
  description: true,
  dialogueId: true,
});

export const TodoCreateManyInput = z.array(TodoCreateInput);

export const TodoFindInput = createSelectSchema(todos).pick({
  dialogueId: true,
});

export const TodoUpdateInput = createSelectSchema(todos).pick({
  completed: true,
  title: true,
  description: true,
});
