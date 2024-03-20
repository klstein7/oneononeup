import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { notes } from "~/server/db/schema";

export const NoteCreateInput = createInsertSchema(notes, {
  content: (schema) => schema.content.min(1, "Content is required"),
}).pick({
  meetingId: true,
  content: true,
  topic: true,
});

export const NoteFindInput = createSelectSchema(notes).pick({
  meetingId: true,
});

export const NoteUpdateInput = createSelectSchema(notes).pick({
  content: true
})

export const Note = createSelectSchema(notes);
