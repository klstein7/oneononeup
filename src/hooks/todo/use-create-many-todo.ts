import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { type z } from "zod";
import { api } from "~/server/api";
import { type TodoCreateManyInput } from "~/server/api/zod";

export const useCreateManyTodo = () => {
  const params = useParams();

  const queryClient = useQueryClient();

  const dialogueId = params.dialogueId as string;

  return useMutation({
    mutationFn: async (input: z.infer<typeof TodoCreateManyInput>) => {
      return api.todo.createMany(input);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["todos", { dialogueId }],
      });
    },
  });
};
