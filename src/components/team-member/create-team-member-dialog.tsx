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

import { toast } from "sonner";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { teamMembers } from "~/server/db/schema";
import { toTitleCase } from "~/lib/utils";
import { useCreateTeamMember } from "~/hooks";

export const CreateTeamMemberDialog = () => {
  const [open, setOpen] = useState(false);

  const createTeamMemberMutation = useCreateTeamMember();

  const form = useForm<z.infer<typeof TeamMemberCreateInput>>({
    resolver: zodResolver(TeamMemberCreateInput),
    defaultValues: {
      name: "",
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
                    <Input
                      autoComplete="off"
                      placeholder="E.g. Kyle"
                      {...field}
                    />
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
              name="type"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMembers.type.enumValues.sort().map((type) => (
                          <SelectItem key={type} value={type}>
                            {toTitleCase(type)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    The type of the team member.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="mt-3"
              type="submit"
              loading={form.formState.isSubmitting}
            >
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
