import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "~/server/api";

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (todoId: string) => {
            return api.todo.del(todoId);
        },
        onSuccess: async ({ dialogueId }) => {
            await queryClient.invalidateQueries({
              queryKey: ["todos", { dialogueId }],
            });
        },
    });
}