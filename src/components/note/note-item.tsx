"use client";

import { type API } from "~/server/api";
import { Button } from "../ui";
import { Ellipsis, PencilIcon, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EditNoteDialog } from "./edit-note-dialog";
import { DeleteNoteDialog } from ".";

export const NoteItem = ({ note }: { note: API["note"]["find"][number] }) => {
  return (
    <div className="flex items-center gap-3 rounded pl-3">
      <div className="h-1.5 w-1.5 rounded-full bg-foreground/25" />
      <div className="flex-1">{note.content}</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <Ellipsis className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <EditNoteDialog
            note={note}
            trigger={
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                <PencilIcon className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            }
          />
          <DeleteNoteDialog
            noteId={note.id}
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
  );
};
