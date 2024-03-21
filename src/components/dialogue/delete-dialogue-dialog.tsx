"use client";

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
import { useDeleteDialogue } from "~/hooks";
import { useRouter } from "next/navigation";

export const DeleteDialogueDialog = ({
  dialogueId,
  trigger,
}: {
  dialogueId: string;
  trigger: JSX.Element;
}) => {
  const deleteDialogueMutation = useDeleteDialogue();
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Dialogue</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this dialogue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deleteDialogueMutation.mutateAsync(dialogueId);
              toast.success("Dialogue deleted successfully!");
              router.push(`/`);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};