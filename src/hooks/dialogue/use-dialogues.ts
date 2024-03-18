import { useQuery } from "@tanstack/react-query";
import { api } from "~/server/api";

export const useDialogues = () => {
  return useQuery({
    queryKey: ["dialogues"],
    queryFn: async () => {
      return api.dialogue.find();
    },
    initialData: [],
  });
};
