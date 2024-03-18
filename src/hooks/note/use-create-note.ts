import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type z } from "zod";
import { api } from "~/server/api";
import { type NoteCreateInput } from "~/server/api/zod";

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: z.infer<typeof NoteCreateInput>) => {
      return api.note.create(input);
    },
    onSuccess: async ({ meetingId }) => {
      return queryClient.invalidateQueries({
        queryKey: ["notes", { meetingId }],
      });
    },
  });
};
