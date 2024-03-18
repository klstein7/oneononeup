import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { api } from "~/server/api";

export const useTodos = () => {
  const params = useParams();

  const dialogueId = params.dialogueId as string;

  return useQuery({
    queryKey: ["todos", { dialogueId }],
    queryFn: () => api.todo.find({ dialogueId }),
    initialData: [],
  });
};
