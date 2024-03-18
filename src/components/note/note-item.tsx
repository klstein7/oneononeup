"use client";

import { type API } from "~/server/api";
import { Button } from "../ui";
import { Ellipsis, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { AlertDialogTrigger } from "../ui/alert-dialog";

export const NoteItem = ({ note }: { note: API["note"]["find"][number] }) => {
  return (
    <div className="flex items-center gap-3 rounded bg-secondary/50 p-3 text-sm justify-between">
      <div>{note.content}</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            >
            <Ellipsis className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
