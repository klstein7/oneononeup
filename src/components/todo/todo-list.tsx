"use client";

import { useTodos } from "~/hooks";
import Image from "next/image";
import { TodoItem } from "./todo-item";
import { useMemo } from "react";

export const TodoList = () => {
  const todos = useTodos();

  if (todos.data.length === 0) {
    return (
      <div className="flex items-center justify-center p-6">
        <Image
          src="/img/no-todos.png"
          width={250}
          height={250}
          alt="No todos"
          className="rounded-full antialiased opacity-25 saturate-0"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 overflow-y-auto scrollbar scrollbar-track-background scrollbar-thumb-muted-foreground">
      {todos.data.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
