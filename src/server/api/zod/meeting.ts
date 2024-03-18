import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { meetings } from "~/server/db/schema";

export const MeetingFindInput = createSelectSchema(meetings).pick({
  dialogueId: true,
});

export const MeetingCreateInput = createInsertSchema(meetings).pick({
  dialogueId: true,
  type: true,
  description: true,
});
