"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { TeamMemberCreateInput } from "~/server/api/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTeamMember } from "~/hooks/team-member/use-create-team-member";
import { toast } from "sonner";
import { useState } from "react";

export const CreateTeamMemberDialog = () => {
  const [open, setOpen] = useState(false);

  const createTeamMemberMutation = useCreateTeamMember();

  const form = useForm<z.infer<typeof TeamMemberCreateInput>>({
    resolver: zodResolver(TeamMemberCreateInput),
    defaultValues: {
      name: "",
      position: "",
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new team member</DialogTitle>
          <DialogDescription>
            A team member is a person who is part of your team.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-3"
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();

              await form.handleSubmit(async (values) => {
                await createTeamMemberMutation.mutateAsync(values);
                toast.success("Team member created!");
                form.reset();
                setOpen(false);
              })();
            }}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g. Kyle" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of the team member.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g. Developer" {...field} />
                  </FormControl>
                  <FormDescription>
                    The position of the team member.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
