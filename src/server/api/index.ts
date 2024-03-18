import { dialogue, teamMember, meeting, note, action } from "./actions";

export const api = {
  dialogue,
  meeting,
  note,
  teamMember,
  action,
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

export type ActionType = {
  [K in keyof typeof action]: Awaited<ReturnType<(typeof action)[K]>>;
};

export type API = {
  dialogue: DialogueType;
  meeting: MeetingType;
  note: NoteType;
  teamMember: TeamMemberType;
  action: ActionType;
};
