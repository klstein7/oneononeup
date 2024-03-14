import { createInsertSchema } from "drizzle-zod";
import { dialogues } from "~/server/db/schema";

export const DialogueCreateInput = createInsertSchema(dialogues).pick({
  teamMemberId: true,
  description: true,
});
