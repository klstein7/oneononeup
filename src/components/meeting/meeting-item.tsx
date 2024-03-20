"use client";

import moment from "moment";
import { type API } from "~/server/api";
import { Badge } from "../ui/badge";
import { CreateNoteForm, NoteList } from "../note";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui";
import { Ellipsis, MessageSquareText, Trash, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useGenerateTodos, useNotes } from "~/hooks";
import { TopicSuggestionList } from "../topic-suggestion";
import { useParams } from "next/navigation";
import { SelectGeneratedTodosDialog } from "../todo";
import { useAtom } from "jotai";
import { generatedTodosAtom } from "~/atoms";
import { Skeleton } from "../ui/skeleton";
import { DeleteMeetingDialog } from ".";
import { toast } from "sonner";

export const MeetingItem = ({
  meeting,
  isReadOnly = false,
}: {
  meeting: API["meeting"]["find"][number];
  isReadOnly?: boolean;
}) => {
  const [, setGeneratedTodos] = useAtom(generatedTodosAtom);
  const params = useParams();
  const dialogueId = params.dialogueId as string;
  const generateTodosMutation = useGenerateTodos();
  const notes = useNotes({ meetingId: meeting.id });

  if (generateTodosMutation.isPending) {
    return (
      <div className="rounded border bg-secondary/25">
        <div className="flex cursor-pointer select-none items-center gap-3 p-3 hover:bg-secondary/75">
          <Skeleton className="h-5 w-5 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Collapsible className="w-full rounded border bg-secondary/25">
      <CollapsibleTrigger asChild>
        <div className="flex cursor-pointer select-none items-center gap-3 p-3 hover:bg-secondary/75">
          <MessageSquareText className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <div className="text-lg font-medium">{meeting.description}</div>
            <div className="text-sm">
              {moment(meeting.createdAt).format("MMM D, YYYY, h:mm A")}
            </div>
            <div className="text-xs text-muted-foreground">
              Updated {moment(meeting.updatedAt).fromNow()}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="font-normal">
              {meeting.type}
            </Badge>
            {!isReadOnly && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Ellipsis className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <SelectGeneratedTodosDialog dialogueId={dialogueId} />
                  <DropdownMenuItem
                    disabled={generateTodosMutation.isPending}
                    onClick={async (e) => {
                      e.stopPropagation();
                      const todos = await generateTodosMutation.mutateAsync({
                        dialogueId,
                        meetings: [
                          {
                            ...meeting,
                            notes: notes.data,
                          },
                        ],
                      });
                      if (todos.length === 0) {
                        toast.info(
                          "Unable to generate new todos, please try again after new notes are added",
                        );
                      }
                      setGeneratedTodos(todos);
                    }}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate todos
                  </DropdownMenuItem>
                  <DeleteMeetingDialog
                    meetingId={meeting.id}
                    trigger={
                      <DropdownMenuItem
                        onSelect={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    }
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-3 p-3">
          <TopicSuggestionList meetingId={meeting.id} isReadOnly={isReadOnly} />
          <NoteList meetingId={meeting.id} />
          {!isReadOnly && <CreateNoteForm meetingId={meeting.id} />}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
