"use client";

import { type API } from "~/server/api";
import { Checkbox } from "../ui/checkbox";
import { useUpdateTodo } from "~/hooks";
import { cn } from "~/lib/utils";

export const TodoItem = ({ todo }: { todo: API["todo"]["find"][number] }) => {
  const updateTodoMutation = useUpdateTodo();

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-sm border px-3 py-1.5 transition-all duration-100 ease-in-out",
        {
          "line-through opacity-50": todo.completed,
        },
      )}
    >
      <Checkbox
        className="rounded"
        checked={todo.completed}
        onCheckedChange={async (checked) => {
          await updateTodoMutation.mutateAsync({
            todoId: todo.id,
            input: {
              completed: checked as boolean,
            },
          });
        }}
      />
      <div>
        <div className="text-sm">{todo.title}</div>
        <div className="text-xs text-muted-foreground">{todo.description}</div>
      </div>
    </div>
  );
};
