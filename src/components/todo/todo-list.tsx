"use client";

import { useTodos } from "~/hooks";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";

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
          className="rounded-full opacity-75 saturate-0"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 overflow-y-auto scrollbar scrollbar-track-background scrollbar-thumb-muted-foreground">
      {todos.data.map((todo, index) => (
        <div
          key={`todo-${index}`}
          className="flex items-center gap-3 rounded-sm border px-3 py-1.5"
        >
          <Checkbox className="rounded" />
          <div>
            <div className="text-sm">{todo.title}</div>
            <div className="text-xs text-muted-foreground">
              {todo.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
