import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/server/api";

export const useDeleteMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (meetingId: string) => {
      return api.meeting.del(meetingId);
    },
    onSuccess: async ({ dialogueId }) => {
      await queryClient.invalidateQueries({
        queryKey: ["meetings", { dialogueId }],
      });
    },
  });
};
