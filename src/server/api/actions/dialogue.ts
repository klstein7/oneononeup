"use server";

import { type z } from "zod";
import { DialogueCreateInput } from "../zod";
import { db } from "~/server/db";
import { dialogues } from "~/server/db/schema";
import { asc, eq } from "drizzle-orm";

export const find = async () => {
  return db.query.dialogues.findMany({
    with: {
      teamMember: true,
    },
    orderBy: asc(dialogues.createdAt),
  });
};

export const create = async (input: z.infer<typeof DialogueCreateInput>) => {
  const values = DialogueCreateInput.parse(input);

  const results = await db.insert(dialogues).values(values).returning();

  const dialogue = results[0];

  if (!dialogue) {
    throw new Error("Failed to create dialogue");
  }

  return dialogue;
};

export const get = async (dialogueId: string) => {
  const result = await db.query.dialogues.findFirst({
    where: eq(dialogues.id, dialogueId),
    with: {
      teamMember: true,
    },
  });

  if (!result) {
    throw new Error("Dialogue not found");
  }

  return result;
};
