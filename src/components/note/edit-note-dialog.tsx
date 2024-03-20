"use client";

import { type API } from "~/server/api";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../ui";
import { toast } from "sonner";
import { useUpdateNote } from "~/hooks/note/use-update-note";
import { NoteUpdateInput } from "~/server/api/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const EditNoteDialog = ({
  note,
  trigger,
}: {
  note: API["note"]["find"][number];
  trigger: JSX.Element;
}) => {
  const [open, setOpen] = useState(false);
  const updateNoteMutation = useUpdateNote();

  const form = useForm<z.infer<typeof NoteUpdateInput>>({
    resolver: zodResolver(NoteUpdateInput)
  });

  useEffect(() => {
    if (!open) {
      form.reset({content: ""});
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[360px]">
        <DialogHeader>
          <DialogTitle>Edit note</DialogTitle>
        </DialogHeader>
        <div className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Note Content:</div>
        <div className="text-sm">{note.content}</div>
        <hr/>
        <Form {...form}>
          <form
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(async (values) => {
              await updateNoteMutation.mutateAsync({
                noteId: note.id,
                input: values,
              });
              toast.success("Note updated successfully!");
              form.reset();
            })}
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Note Content</FormLabel>
                  <FormControl>
                    <Input
                      className="resize-none"
                      placeholder="E.g. Note content placeholder..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter new content here...</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-3 flex items-center justify-end gap-3">
              <Button variant="secondary" 
                onClick={() => {
                  setOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button type="submit" loading={form.formState.isSubmitting}>
                Update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
