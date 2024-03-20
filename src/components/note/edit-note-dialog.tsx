"use client";

import { API } from "~/server/api";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
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
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const EditNoteDialog = ({ 
  note,
  trigger
 }: {
  note: API["note"]["find"][number],
  trigger: JSX.Element
 }) => {
  const updateNoteMutation = useUpdateNote();

  const form = useForm<z.infer<typeof NoteUpdateInput>>({
    resolver: zodResolver(NoteUpdateInput),
    defaultValues: {
      content: note.content
    },
  });
  
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[360px]">
        <DialogHeader>
          <DialogTitle>Edit note</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          {note.content}
          <Form {...form}>
            <form
              className="flex flex-col gap-3"
              onSubmit={async () => {
                await updateNoteMutation.mutateAsync({
                  noteId: note.id,
                  input: form.getValues(),
                });
                toast.success("Note updated successfully!");
              }}
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Input
                        className="resize-none"
                        placeholder="E.g. Note content placeholder..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      New Note content here...
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-3"
                loading={form.formState.isSubmitting}
              >
                Update
              </Button>
            </form>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
