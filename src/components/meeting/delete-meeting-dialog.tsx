"use client";

import { useDeleteMeeting } from "~/hooks";
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

export const DeleteMeetingDialog = ({
  meetingId,
  trigger,
}: {
  meetingId: string;
  trigger: JSX.Element;
}) => {
  const deleteMeetingMutation = useDeleteMeeting();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete meeting</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this meeting?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deleteMeetingMutation.mutateAsync(meetingId);
              toast.success("Meeting deleted successfully!");
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
