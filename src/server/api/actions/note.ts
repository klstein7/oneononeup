"use server";

import { type z } from "zod";
import { NoteCreateInput, NoteFindInput, NoteUpdateInput } from "../zod";
import { db } from "~/server/db";
import { notes } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const create = async (input: z.infer<typeof NoteCreateInput>) => {
  const values = NoteCreateInput.parse(input);

  const results = await db.insert(notes).values(values).returning();

  const note = results[0];

  if (!note) {
    throw new Error("Failed to create note");
  }

  return note;
};

export const update = async (
  noteId: string,
  input: z.infer<typeof NoteUpdateInput>
) => {
  const values = NoteUpdateInput.parse(input);

  const results = await db
    .update(notes)
    .set({...values, updatedAt: new Date()})
    .where(eq(notes.id, noteId))
    .returning();

  const note = results[0];

  if (!note) {
    throw new Error("Failed to update note");
  }

  return note;
}

export const find = async (input: z.infer<typeof NoteFindInput>) => {
  const { meetingId } = NoteFindInput.parse(input);

  return db.query.notes.findMany({
    where: eq(notes.meetingId, meetingId),
  });
};

export const del = async (noteId: string) => {
  const results = await db
    .delete(notes)
    .where(eq(notes.id, noteId))
    .returning();

  const note = results[0];

  if (!note) {
    throw new Error("Failed to delete note");
  }

  return note;
};
