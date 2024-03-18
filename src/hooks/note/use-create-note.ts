import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { type z } from "zod";
import { api } from "~/server/api";
import { type NoteCreateInput } from "~/server/api/zod";

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  const params = useParams();

  const dialogueId = params.dialogueId as string;

  return useMutation({
    mutationFn: async (input: z.infer<typeof NoteCreateInput>) => {
      return api.note.create(input);
    },
    onSuccess: async ({ meetingId }) => {
      await queryClient.invalidateQueries({
        queryKey: ["notes", { meetingId }],
      });

      await queryClient.invalidateQueries({
        queryKey: ["meetings", { dialogueId }],
      });
    },
  });
};
