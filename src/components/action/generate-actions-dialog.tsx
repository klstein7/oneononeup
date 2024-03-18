"use client";

import { Sparkles } from "lucide-react";
import { Button, Dialog, DialogTrigger } from "../ui";

export const GenerateActionsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Sparkles className="mr-2 h-4 w-4" />
          Generate
        </Button>
      </DialogTrigger>
    </Dialog>
  );
};
