"use client";

import { Plus } from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
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
  Textarea,
} from "../ui";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { TodoCreateInput } from "~/server/api/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateTodo } from "~/hooks";

export const CreateTodosDialog = ({ dialogueId }: { dialogueId: string }) => {
  const [open, setOpen] = useState(false);

    const createTodosMutation = useCreateTodo();

  const form = useForm<z.infer<typeof TodoCreateInput>>({
    resolver: zodResolver(TodoCreateInput),
    defaultValues: {
      dialogueId,
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-3.5 w-3.5" />
          Todo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new todo</DialogTitle>
          <DialogDescription>
            Enter a title for the Todo
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(async (values) => {
              await createTodosMutation.mutateAsync(values);
              toast.success("Todo created successfully!");
              form.reset();
              setOpen(false);
            })}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="E.g. Title placeholder..."
                      rows={1}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The title of the todo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="E.g. Description placeholder..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The description of the todo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-3">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
