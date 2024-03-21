"use client";

import { type API } from "~/server/api";
import { Button } from "../ui";
import { Checkbox } from "../ui/checkbox";
import { useUpdateTodo } from "~/hooks";
import { cn } from "~/lib/utils";
import { Ellipsis, PencilIcon, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DeleteTodoDialog } from ".";
import { EditTodoDialog } from "./edit-todo.dialog";

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
              ...todo,
              completed: checked as boolean,
            },
          });
        }}
      />
      <div className="flex-1">
        <div className="text-sm">{todo.title}</div>
        <div className="text-xs text-muted-foreground">{todo.description}</div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <Ellipsis className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <EditTodoDialog
            todo={todo}
            trigger={
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                <PencilIcon className="mr-2 h-4 w-4"></PencilIcon>
                Edit
              </DropdownMenuItem>
            }
          />
          <DeleteTodoDialog
            todoId={todo.id}
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
