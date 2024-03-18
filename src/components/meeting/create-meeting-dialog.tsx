"use client";

import { Plus } from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "../ui";
import { useCreateMeeting } from "~/hooks";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { MeetingCreateInput } from "~/server/api/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { meetings } from "~/server/db/schema";
import { toTitleCase } from "~/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

export const CreateMeetingDialog = ({ dialogueId }: { dialogueId: string }) => {
  const [open, setOpen] = useState(false);

  const createMeetingMutation = useCreateMeeting();

  const form = useForm<z.infer<typeof MeetingCreateInput>>({
    resolver: zodResolver(MeetingCreateInput),
    defaultValues: {
      dialogueId,
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus className="mr-2 h-3.5 w-3.5" />
          Meeting
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new meeting</DialogTitle>
          <DialogDescription>
            Log notes and action items from your meeting.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(async (values) => {
              await createMeetingMutation.mutateAsync(values);
              toast.success("Meeting created successfully!");
              form.reset();
              setOpen(false);
            })}
          >
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
                        {meetings.type.enumValues.map((type) => (
                          <SelectItem key={type} value={type}>
                            {toTitleCase(type)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>The type of the meeting.</FormDescription>
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
                      placeholder="E.g. Discussed the new project timeline..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The description of the meeting.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-3">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
