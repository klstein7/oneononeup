import { useMutation } from "@tanstack/react-query";
import { type z } from "zod";
import { api } from "~/server/api";
import { type TodoGenerateInput } from "~/server/api/zod";

export const useGenerateTodos = () => {
  return useMutation({
    mutationFn: async (input: z.infer<typeof TodoGenerateInput>) => {
      return api.todo.generate(input);
    },
  });
};
