"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui";

export const EditNoteDialog = ({ trigger }: { trigger: JSX.Element }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[360px]">
        <DialogHeader>
          <DialogTitle>Edit note</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
