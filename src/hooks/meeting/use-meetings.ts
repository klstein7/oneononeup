import { useQuery } from "@tanstack/react-query";
import { type z } from "zod";
import { api } from "~/server/api";
import { type MeetingFindInput } from "~/server/api/zod";

export const useMeetings = (input: z.infer<typeof MeetingFindInput>) => {
  return useQuery({
    queryKey: ["meetings", input],
    queryFn: () => api.meeting.find(input),
    initialData: [],
  });
};
