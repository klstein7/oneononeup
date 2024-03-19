import { useQuery } from "@tanstack/react-query";
import { type z } from "zod";
import { api } from "~/server/api";
import { type TopicSuggestionFindInput } from "~/server/api/zod";

export const useTopicSuggestions = (
  input: z.infer<typeof TopicSuggestionFindInput>,
) => {
  const { data, ...rest } = useQuery({
    queryKey: ["topic-suggestions", input],
    queryFn: () => api.topicSuggestion.find(input),
  });

  return {
    ...rest,
    data: data ?? [],
  };
};
