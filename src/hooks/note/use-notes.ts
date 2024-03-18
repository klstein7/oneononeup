import { useQuery } from "@tanstack/react-query";
import { type z } from "zod";
import { type API, api } from "~/server/api";
import { type NoteFindInput } from "~/server/api/zod";

export const useNotes = (
  input: z.infer<typeof NoteFindInput>,
  initialData: API["meeting"]["find"][number]["notes"] = [],
) => {
  return useQuery({
    queryKey: ["notes", input],
    queryFn: () => api.note.find(input),
    initialData,
  });
};
