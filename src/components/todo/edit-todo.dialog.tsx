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
  Textarea,
} from "../ui";
import { useEffect, useState } from "react";
import { TodoUpdateInput } from "~/server/api/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useUpdateTodo } from "~/hooks";
import { toast } from "sonner";

export const EditTodoDialog = ({
  todo,
  trigger,
}: {
  todo: API["todo"]["find"][number];
  trigger: JSX.Element;
}) => {
  const [open, setOpen] = useState(false);
  const updateTodoMutation = useUpdateTodo();
  const form = useForm<z.infer<typeof TodoUpdateInput>>({
    resolver: zodResolver(TodoUpdateInput),
    defaultValues: todo,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[360px]">
        <DialogHeader>
          <DialogTitle>Edit todo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(async (values) => {
              await updateTodoMutation.mutateAsync({
                todoId: todo.id,
                input: {
                  ...todo,
                  title: values.title,
                  description: values.description,
                },
              });
              toast.success("Todo updated succuessfully!");
              setOpen(false);
              form.reset();
            })}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      className="resize-none"
                      placeholder="E.g. Follow up on interest in going to Angular conference"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>The title of the todo.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="E.g. Previously expressed interest in going to Angular conference. Follow up to see if there is a particular date in mind."
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
            <Button type="submit" loading={form.formState.isSubmitting}>
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
