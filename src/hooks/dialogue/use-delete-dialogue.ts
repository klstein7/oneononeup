import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/server/api";

export const useDeleteDialogue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dialogueId: string) => {
      return api.dialogue.del(dialogueId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["dialogues"],
      });
    },
  });
};
