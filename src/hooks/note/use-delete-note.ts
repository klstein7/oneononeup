import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/server/api";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (noteId: string) => {
      return api.note.del(noteId);
    },
    onSuccess: async ({ meetingId }) => {
      await queryClient.invalidateQueries({
        queryKey: ["notes", { meetingId }],
      });
    },
  });
};
