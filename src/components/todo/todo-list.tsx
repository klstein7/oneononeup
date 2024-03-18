"use client";

import { useTodos } from "~/hooks";
import { Checkbox } from "../ui/checkbox";

export const TodoList = () => {
  const todos = useTodos();

  return (
    <div className="scrollbar scrollbar-track-background scrollbar-thumb-muted-foreground flex flex-col gap-1.5 overflow-y-auto">
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
