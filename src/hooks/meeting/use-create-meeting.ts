import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type z } from "zod";
import { api } from "~/server/api";
import { type MeetingCreateInput } from "~/server/api/zod";

export const useCreateMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: z.infer<typeof MeetingCreateInput>) => {
      return api.meeting.create(input);
    },
    onSuccess: async ({ dialogueId }) => {
      await queryClient.invalidateQueries({
        queryKey: ["meetings", { dialogueId }],
      });
    },
  });
};
