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
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
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
  type: text("type", { enum: ["employee", "manager", "colleague"] }).notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const meetings = createTable("meeting", {
  id: text("id", { length: 25 }).primaryKey().$defaultFn(createId).notNull(),
  dialogueId: text("dialogue_id", { length: 25 }).notNull(),
  type: text("type", { enum: ["one-on-one"] }).notNull(),
  description: text("description").default("").notNull(),
  summary: text("summary").default("").notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const notes = createTable("note", {
  id: text("id", { length: 25 }).primaryKey().$defaultFn(createId).notNull(),
  meetingId: text("meeting_id", { length: 25 }).notNull(),
  content: text("content").notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const actions = createTable("action", {
  id: text("id", { length: 25 }).primaryKey().$defaultFn(createId).notNull(),
  dialogueId: text("dialogue_id", { length: 25 }).notNull(),
  title: text("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  status: text("status", {
    enum: ["active", "completed", "canceled", "postponed", "rescheduled"],
  })
    .default("active")
    .notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const actionRelations = relations(actions, ({ one }) => ({
  dialogue: one(dialogues, {
    fields: [actions.dialogueId],
    references: [dialogues.id],
  }),
}));
