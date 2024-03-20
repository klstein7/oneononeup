"use client";

import { toast } from "sonner";
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
import { useDeleteNote } from "~/hooks";

export const DeleteNoteDialog = ({
  noteId,
  trigger,
}: {
  noteId: string;
  trigger: JSX.Element;
}) => {
  const deleteNoteMutation = useDeleteNote();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete note</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this note?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deleteNoteMutation.mutateAsync(noteId);
              toast.success("Note deleted successfully!");
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
