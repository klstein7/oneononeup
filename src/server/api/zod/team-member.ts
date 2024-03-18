import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { teamMembers } from "~/server/db/schema";

export const TeamMember = createSelectSchema(teamMembers);

export const TeamMemberCreateInput = createInsertSchema(teamMembers, {
  name: (schema) => schema.name.min(1, "Name is required"),
}).pick({
  name: true,
  type: true,
});
