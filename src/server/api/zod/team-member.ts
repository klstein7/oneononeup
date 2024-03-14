import { createInsertSchema } from "drizzle-zod";
import { teamMembers } from "~/server/db/schema";

export const TeamMemberCreateInput = createInsertSchema(teamMembers, {
  name: (schema) => schema.name.min(1, "Name is required"),
  position: (schema) => schema.position.min(1, "Position is required"),
}).pick({
  name: true,
  position: true,
});
