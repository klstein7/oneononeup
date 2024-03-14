"use server";

import { type z } from "zod";
import { type DialogueCreateInput } from "../zod";

export const create = async (input: z.infer<typeof DialogueCreateInput>) => {};
