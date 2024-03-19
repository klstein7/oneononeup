import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type z } from "zod";
import { api } from "~/server/api";
import { type TopicSuggestionGenerateInput } from "~/server/api/zod";

export const useGenerateTopicSuggestions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: z.infer<typeof TopicSuggestionGenerateInput>) => {
      return api.topicSuggestion.generate(input);
    },
    onSuccess: async (_, { meetingId }) => {
      await queryClient.invalidateQueries({
        queryKey: ["topic-suggestions", { meetingId }],
      });
    },
  });
};
