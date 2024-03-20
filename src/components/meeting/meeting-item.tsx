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
import { Ellipsis, MessageSquareText, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TopicSuggestionList } from "../topic-suggestion";
import { DeleteMeetingDialog } from ".";

export const MeetingItem = ({
  meeting,
}: {
  meeting: API["meeting"]["find"][number];
}) => {
  return (
    <Collapsible className="rounded border bg-secondary/25">
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
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-3 p-3">
          <TopicSuggestionList meetingId={meeting.id} />
          <NoteList meetingId={meeting.id} />
          <CreateNoteForm meetingId={meeting.id} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
