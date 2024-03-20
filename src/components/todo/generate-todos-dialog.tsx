"use client";

import { Sparkles } from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui";
import { useGenerateTodos, useMeetings } from "~/hooks";
import { Checkbox } from "../ui/checkbox";
import { useEffect, useState } from "react";
import { type API } from "~/server/api";
import { useAtom } from "jotai";
import { generatedTodosAtom } from "~/atoms";
import { useQueryClient } from "@tanstack/react-query";
import { MeetingItem } from "../meeting";
import { toast } from "sonner";

export const GenerateTodosDialog = ({ dialogueId }: { dialogueId: string }) => {
  const queryClient = useQueryClient();

  const [, setGeneratedTodos] = useAtom(generatedTodosAtom);
  const [selectedMeetings, setSelectedMeetings] = useState<
    API["meeting"]["find"]
  >([]);

  const [open, setOpen] = useState(false);

  const meetings = useMeetings({ dialogueId });

  const generateTodosMutation = useGenerateTodos();

  const getNotesByMeetingId = (meetingId: string) => {
    return (
      queryClient.getQueryData<API["note"]["find"]>(["notes", { meetingId }]) ??
      []
    );
  };

  useEffect(() => {
    if (!open) {
      setSelectedMeetings([]);
    }
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Sparkles className="mr-2 h-4 w-4" />
          Generate
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto scrollbar scrollbar-track-transparent scrollbar-thumb-muted">
        <DialogHeader>
          <DialogTitle>Generate todos</DialogTitle>
          <DialogDescription>
            Select meetings to generate a set of todos
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          {meetings.data.map((meeting) => (
            <div className="flex items-center gap-3" key={meeting.id}>
              <Checkbox
                className="rounded"
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedMeetings([...selectedMeetings, meeting]);
                  } else {
                    setSelectedMeetings(
                      selectedMeetings.filter((m) => m.id !== meeting.id),
                    );
                  }
                }}
              />
              <MeetingItem meeting={meeting} isReadOnly />
            </div>
          ))}
          <Button
            loading={generateTodosMutation.isPending}
            className="mt-3"
            onClick={async () => {
              const todos = await generateTodosMutation.mutateAsync({
                dialogueId,
                meetings: selectedMeetings.map((m) => ({
                  ...m,
                  notes: getNotesByMeetingId(m.id),
                })),
              });
              if (todos.length === 0) {
                toast.message(
                  "Unable to generate new actionable todos from selected meetings",
                );
              }
              setGeneratedTodos(todos);
              setOpen(false);
            }}
          >
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
