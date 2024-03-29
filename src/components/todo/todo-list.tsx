"use client";

import Image from "next/image";
import { useTodos } from "~/hooks";
import { TodoItem } from "./todo-item";
import { useEffect, useMemo, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import autoAnimate from "@formkit/auto-animate";
import { type API } from "~/server/api";

const List = ({ todos }: { todos: API["todo"]["find"] }) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      autoAnimate(listRef.current);
    }
  }, [listRef]);

  return (
    <div ref={listRef} className="flex flex-col gap-1.5 overflow-hidden">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export const TodoList = () => {
  const todos = useTodos();

  const activeTodos = useMemo(() => {
    return todos.data.filter((todo) => !todo.completed);
  }, [todos.data]);

  const completedTodos = useMemo(() => {
    return todos.data.filter((todo) => todo.completed);
  }, [todos.data]);

  const listRef = useRef<HTMLDivElement>(null);

  const renderTodos = (t: typeof todos.data) => {
    if (t.length === 0) {
      return (
        <div className="flex items-center justify-center p-6">
          <Image
            src="/img/no-todos.png"
            width={250}
            height={250}
            alt="No todos"
            className="rounded-full antialiased opacity-25 saturate-0 dark:opacity-15 dark:invert"
          />
        </div>
      );
    }

    return <List todos={t} />;
  };

  useEffect(() => {
    if (listRef.current) {
      autoAnimate(listRef.current);
    }
  }, [listRef]);

  return (
    <div className="flex flex-col gap-1.5 overflow-y-auto scrollbar scrollbar-track-background scrollbar-thumb-muted-foreground">
      <Tabs defaultValue="active">
        <TabsList className="w-full">
          <TabsTrigger
            value="active"
            className="flex w-full items-center gap-2"
          >
            <span>Active</span>
            {activeTodos.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {activeTodos.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="flex w-full items-center gap-2"
          >
            <span>Completed</span>
            {completedTodos.length > 0 && (
              <span className="rounded-md border bg-background p-0.5 px-1 text-xs text-muted-foreground">
                {completedTodos.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active">{renderTodos(activeTodos)}</TabsContent>
        <TabsContent value="completed">
          {renderTodos(completedTodos)}
        </TabsContent>
      </Tabs>
    </div>
  );
};
