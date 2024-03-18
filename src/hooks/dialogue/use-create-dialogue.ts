import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type z } from "zod";
import { api } from "~/server/api";
import { type DialogueCreateInput } from "~/server/api/zod";

export const useCreateDialogue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: z.infer<typeof DialogueCreateInput>) => {
      return api.dialogue.create(input);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["dialogues"],
      });
    },
  });
};
