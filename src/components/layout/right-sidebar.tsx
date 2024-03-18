"use client";

import { Plus } from "lucide-react";
import { GenerateTodosDialog, TodoList } from "../todo";
import { Button } from "../ui";
import { useParams } from "next/navigation";
import { SelectGeneratedTodosDialog } from "../todo/select-generated-todos-dialog";

export const RightSidebar = () => {
  const params = useParams();

  const dialogueId = params.dialogueId as string;

  if (!dialogueId) {
    return null;
  }

  return (
    <div className="flex h-full w-80 flex-col gap-3 p-3">
      <div className="flex flex-col gap-1.5 overflow-y-hidden">
        <div className="flex items-center gap-1.5">
          <div className="flex-1">
            <div>Todos</div>
          </div>
          <GenerateTodosDialog dialogueId={dialogueId} />
          <Button variant="ghost" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Todo
          </Button>
        </div>
        <TodoList />
        <SelectGeneratedTodosDialog dialogueId={dialogueId} />
      </div>
    </div>
  );
};
