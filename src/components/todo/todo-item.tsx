"use client";

import { type API } from "~/server/api";
import { Button } from "../ui";
import { Checkbox } from "../ui/checkbox";
import { useDeleteTodo, useUpdateTodo } from "~/hooks";
import { cn } from "~/lib/utils";
import { Ellipsis, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "sonner";

export const TodoItem = ({ todo }: { todo: API["todo"]["find"][number] }) => {
  const updateTodoMutation = useUpdateTodo();
  const deletetodoMutation = useDeleteTodo();

  return (
    <AlertDialog>
      <DropdownMenu>
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
          <div className="flex-1">
            <div className="text-sm">{todo.title}</div>
            <div className="text-xs text-muted-foreground">
              {todo.description}
            </div>
          </div>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <Ellipsis className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end">
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete todo</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this todo?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  await deletetodoMutation.mutateAsync(todo.id);
                  toast.success("Todo deleted successfully!");
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </div>
      </DropdownMenu>
    </AlertDialog>
  );
};
