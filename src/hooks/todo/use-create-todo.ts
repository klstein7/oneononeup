import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type z } from "zod";
import { api } from "~/server/api";
import { TodoCreateInput } from "~/server/api/zod";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: z.infer<typeof TodoCreateInput>) => {
        return api.todo.create(input)
    },
    onSuccess: async ({ dialogueId }) => {
      await queryClient.invalidateQueries({
        queryKey: ["todos", { dialogueId }],
      });
    },
  });
};
