import { dialogue, teamMember, meeting, note, todo } from "./actions";

export const api = {
  dialogue,
  meeting,
  note,
  teamMember,
  todo,
};

export type DialogueType = {
  [K in keyof typeof dialogue]: Awaited<ReturnType<(typeof dialogue)[K]>>;
};

export type MeetingType = {
  [K in keyof typeof meeting]: Awaited<ReturnType<(typeof meeting)[K]>>;
};

export type NoteType = {
  [K in keyof typeof note]: Awaited<ReturnType<(typeof note)[K]>>;
};

export type TeamMemberType = {
  [K in keyof typeof teamMember]: Awaited<ReturnType<(typeof teamMember)[K]>>;
};

export type TodoType = {
  [K in keyof typeof todo]: Awaited<ReturnType<(typeof todo)[K]>>;
};

export type API = {
  dialogue: DialogueType;
  meeting: MeetingType;
  note: NoteType;
  teamMember: TeamMemberType;
  todo: TodoType;
};
