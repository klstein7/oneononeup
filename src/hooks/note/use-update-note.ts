import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type z } from "zod";
import { api } from "~/server/api";
import { NoteUpdateInput } from "~/server/api/zod";

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
        noteId,
        input,
      }: {
        noteId: string;
        input: z.infer<typeof NoteUpdateInput>;
      }) => {
        return api.note.update(noteId, input);
      },
    onSuccess: async ({ meetingId }) => {
      await queryClient.invalidateQueries({
        queryKey: ["notes", { meetingId }],
      });
    },
  });
};
