import { dialogue, teamMember } from "./actions";

export const api = {
  dialogue,
  teamMember,
};

export type DialogueType = {
  [K in keyof typeof dialogue]: Awaited<ReturnType<(typeof dialogue)[K]>>;
};

export type TeamMemberType = {
  [K in keyof typeof teamMember]: Awaited<ReturnType<(typeof teamMember)[K]>>;
};

export type API = {
  dialogue: DialogueType;
  teamMember: TeamMemberType;
};
