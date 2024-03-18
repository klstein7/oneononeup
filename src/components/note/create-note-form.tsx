"use client";

import { Plus, ArrowRight } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "../ui";
import { useCreateNote } from "~/hooks";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { NoteCreateInput } from "~/server/api/zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const CreateNoteForm = ({ meetingId }: { meetingId: string }) => {
  const createNoteMutation = useCreateNote();

  const form = useForm<z.infer<typeof NoteCreateInput>>({
    resolver: zodResolver(NoteCreateInput),
    defaultValues: {
      meetingId,
      content: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          await createNoteMutation.mutateAsync(values);
          form.reset();
        })}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative bg-background">
                  <Input
                    autoComplete="off"
                    className="pl-9 pr-9"
                    placeholder="Add a note..."
                    {...field}
                  />
                  <div className="absolute left-0 top-0 flex h-full items-center pl-3 text-muted-foreground">
                    <Plus className="h-4 w-4" />
                  </div>
                  <div className="absolute right-0 top-0 flex h-full items-center pr-3 text-muted-foreground">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
      </form>
    </Form>
  );
};
