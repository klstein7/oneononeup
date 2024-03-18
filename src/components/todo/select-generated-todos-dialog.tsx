"use client";

import { useAtom } from "jotai";
import { generatedTodosAtom } from "~/atoms";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Checkbox } from "../ui/checkbox";
import { useEffect, useState } from "react";
import { type z } from "zod";
import { type TodoGenerateOutput } from "~/server/api/zod";
import { useCreateManyTodo } from "~/hooks/todo/use-create-many-todo";

export const SelectGeneratedTodosDialog = ({
  dialogueId,
}: {
  dialogueId: string;
}) => {
  const [open, setOpen] = useState(false);

  const [generatedTodos, setGeneratedTodos] = useAtom(generatedTodosAtom);
  const [selectedTodos, setSelectedTodos] = useState<
    z.infer<typeof TodoGenerateOutput>["todos"]
  >([]);

  const createManyTodoMutation = useCreateManyTodo();

  useEffect(() => {
    setOpen(generatedTodos.length > 0);
  }, [generatedTodos]);

  useEffect(() => {
    if (!open) {
      setSelectedTodos([]);
      setGeneratedTodos([]);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select generated todos</DialogTitle>
          <DialogDescription>
            Select todos to add to the current dialogue
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          {generatedTodos.map((todo, index) => (
            <div
              key={`todo-${index}`}
              className="flex items-center gap-3 rounded-md border p-3"
            >
              <Checkbox
                className="rounded"
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedTodos([...selectedTodos, todo]);
                  } else {
                    setSelectedTodos(
                      selectedTodos.filter(
                        (t) =>
                          t.title !== todo.title &&
                          t.description !== todo.description,
                      ),
                    );
                  }
                }}
              />
              <div>
                <div className="text-sm">{todo.title}</div>
                <div className="text-xs text-muted-foreground">
                  {todo.description}
                </div>
              </div>
            </div>
          ))}
          <Button
            className="mt-3"
            onClick={async () => {
              console.log(selectedTodos);
              await createManyTodoMutation.mutateAsync(
                selectedTodos.map((todo) => ({ ...todo, dialogueId })),
              );
              setOpen(false);
            }}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
