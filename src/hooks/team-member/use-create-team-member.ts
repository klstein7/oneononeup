import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type z } from "zod";
import { api } from "~/server/api";
import { type TeamMemberCreateInput } from "~/server/api/zod";

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: z.infer<typeof TeamMemberCreateInput>) => {
      return api.teamMember.create(input);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["team-members"],
      });
    },
  });
};
