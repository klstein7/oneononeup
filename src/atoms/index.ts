import { atom } from "jotai";
import { type z } from "zod";
import { type TodoGenerateOutput } from "~/server/api/zod";

export const generatedTodosAtom = atom<
  z.infer<typeof TodoGenerateOutput>["todos"]
>([]);
