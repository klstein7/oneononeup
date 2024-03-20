"use client";

import { CreateDialogueDialog, DialogueList } from "../dialogue";
import { Avatar, AvatarFallback } from "../ui";

import dynamic from "next/dynamic";

const ThemeToggle = dynamic(
  () => import("../ui/theme-toggle").then((mod) => mod.ThemeToggle),
  {
    ssr: false,
  },
);

export const LeftSidebar = () => {
  return (
    <div className="flex h-full w-80 flex-col gap-3 bg-secondary/25 p-3">
      <CreateDialogueDialog />
      <DialogueList className="flex-1" />
      <div className="flex items-center gap-3">
        <div className="flex flex-1 select-none items-center gap-3 rounded-xl border bg-background px-3 py-1.5">
          <Avatar className="h-8 w-8">
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium">Placeholder User</div>
            <div className="text-xs text-muted-foreground">
              placeholder.user@email.com
            </div>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};
