import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type z } from "zod";
import { api } from "~/server/api";
import { type TodoUpdateInput } from "~/server/api/zod";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      todoId,
      input,
    }: {
      todoId: string;
      input: z.infer<typeof TodoUpdateInput>;
    }) => {
      return api.todo.update(todoId, input);
    },
    onSuccess: async ({ dialogueId }) => {
      await queryClient.invalidateQueries({
        queryKey: ["todos", { dialogueId }],
      });
    },
  });
};
