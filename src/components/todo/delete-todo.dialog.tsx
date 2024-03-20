"use client";

import { useDeleteTodo } from "~/hooks";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { toast } from "sonner";

export const DeleteTodoDialog = ({
  todoId,
  trigger,
}: {
  todoId: string;
  trigger: JSX.Element;
}) => {
  const deletetodoMutation = useDeleteTodo();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
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
              await deletetodoMutation.mutateAsync(todoId);
              toast.success("Todo deleted successfully!");
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
