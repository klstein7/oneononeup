"use server";

import { type z } from "zod";
import { DialogueCreateInput } from "../zod";

export const create = async (input: z.infer<typeof DialogueCreateInput>) => {
  const values = DialogueCreateInput.parse(input);
  
};
