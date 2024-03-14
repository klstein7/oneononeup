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
import { type DialogueCreateInput } from "~/server/api/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { useTeamMembers } from "~/hooks/team-member/use-team-members";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CreateTeamMemberDialog } from "../team-member/create-team-member-dialog";
import { Textarea } from "../ui/textarea";

export const CreateDialogueDialog = () => {
  const teamMembers = useTeamMembers();
  const form = useForm<z.infer<typeof DialogueCreateInput>>();

  console.log(teamMembers.data);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
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
          <div className="flex flex-col gap-3">
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
                                  {teamMember.position}
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
                </FormItem>
              )}
            />
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
