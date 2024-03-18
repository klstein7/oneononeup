import { z } from "zod";
import { Note } from "./note";
import { createSelectSchema } from "drizzle-zod";
import { actions } from "~/server/db/schema";

export const Action = createSelectSchema(actions, {
  title: (schema) => schema.title.describe("A very short title for the action"),
  description: (schema) =>
    schema.description.describe("A description of the action. 1-2 sentences."),
}).pick({
  title: true,
  description: true,
});

export const ActionGenerateInput = z.object({
  dialogueId: z.string(),
  notes: z.array(Note),
});

export const ActionGenerateOutput = z.object({
  actions: z.array(Action),
});
