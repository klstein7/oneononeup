"use client";

import { CreateTodosDialog, GenerateTodosDialog, TodoList } from "../todo";
import { useParams } from "next/navigation";
import { SelectGeneratedTodosDialog } from "../todo/select-generated-todos-dialog";

export const RightSidebar = () => {
  const params = useParams();

  const dialogueId = params.dialogueId as string;

  if (!dialogueId) {
    return null;
  }

  return (
    <div className="flex h-full w-96 flex-col gap-3 bg-secondary/25 p-3">
      <div className="flex flex-col gap-1.5 overflow-y-hidden">
        <div className="flex items-center gap-1.5">
          <div className="flex-1">
            <div className="font-medium">Todos</div>
          </div>
          <GenerateTodosDialog dialogueId={dialogueId} />
          <CreateTodosDialog dialogueId={dialogueId} />
        </div>
        <TodoList />
        <SelectGeneratedTodosDialog dialogueId={dialogueId} />
      </div>
    </div>
  );
};
