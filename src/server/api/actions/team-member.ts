"use server";

import { asc } from "drizzle-orm";
import { type z } from "zod";
import { db } from "~/server/db";
import { teamMembers } from "~/server/db/schema";
import { TeamMemberCreateInput } from "../zod";

export const find = async () => {
  return db.query.teamMembers.findMany({
    orderBy: asc(teamMembers.name),
  });
};

export const create = async (input: z.infer<typeof TeamMemberCreateInput>) => {
  const values = TeamMemberCreateInput.parse(input);

  const results = await db.insert(teamMembers).values(values).returning();

  const teamMember = results[0];

  if (!teamMember) {
    throw new Error("Unable to create team member");
  }

  return teamMember;
};
