import { useQuery } from "@tanstack/react-query";
import { api } from "~/server/api";

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ["team-members"],
    queryFn: () => api.teamMember.find(),
    initialData: [],
  });
};
