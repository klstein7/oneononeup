"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { DialogueCreateInput } from "~/server/api/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useCreateDialogue, useTeamMembers } from "~/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CreateTeamMemberDialog } from "../team-member/create-team-member-dialog";
import { Textarea } from "../ui/textarea";
import { toTitleCase } from "~/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { toast } from "sonner";

export const CreateDialogueDialog = () => {
  const [open, setOpen] = useState(false);

  const teamMembers = useTeamMembers();

  const createDialogueMutation = useCreateDialogue();

  const form = useForm<z.infer<typeof DialogueCreateInput>>({
    resolver: zodResolver(DialogueCreateInput),
    defaultValues: {
      description: "",
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Dialogue
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new dialogue</DialogTitle>
          <DialogDescription>
            A dialogue is a one-on-one meeting between you and a team member.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(async (values) => {
              await createDialogueMutation.mutateAsync(values);
              toast.success("Dialogue created successfully!");
              form.reset();
              setOpen(false);
            })}
          >
            <FormField
              control={form.control}
              name="teamMemberId"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Team member</FormLabel>
                  <div className="flex gap-3">
                    <FormControl>
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {teamMembers.data.map((teamMember) => (
                            <SelectItem
                              key={teamMember.id}
                              value={teamMember.id}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-muted-foreground">
                                  {toTitleCase(teamMember.type)}
                                </span>
                                {teamMember.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <CreateTeamMemberDialog />
                  </div>
                  <FormDescription>
                    The team member you have a dialogue with.
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
                      placeholder="E.g. One-on-one meetings with Kyle"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The description of the dialogue.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-3" type="submit">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
