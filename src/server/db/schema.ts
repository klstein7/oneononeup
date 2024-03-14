import { relations, sql } from "drizzle-orm";
import { int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

export const createTable = sqliteTableCreator(
  (name) => `one-on-one-up_${name}`,
);

export const dialogues = createTable("dialogue", {
  id: text("id", { length: 25 }).primaryKey().$defaultFn(createId).notNull(),
  teamMemberId: text("team_member_id", { length: 25 }).notNull(),
  description: text("description").notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const dialogueRelations = relations(dialogues, ({ one }) => ({
  teamMember: one(teamMembers, {
    fields: [dialogues.teamMemberId],
    references: [teamMembers.id],
  }),
}));

export const teamMembers = createTable("team_member", {
  id: text("id", { length: 25 }).primaryKey().$defaultFn(createId).notNull(),
  name: text("name", { length: 256 }).notNull(),
  position: text("position", { length: 256 }).notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
