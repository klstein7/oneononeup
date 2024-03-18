import { useMutation } from "@tanstack/react-query";
import { type z } from "zod";
import { api } from "~/server/api";
import { type ActionGenerateInput } from "~/server/api/zod";

export const useGenerateActions = () => {
  return useMutation({
    mutationFn: async (input: z.infer<typeof ActionGenerateInput>) => {
      return api.action.generate(input);
    },
  });
};
