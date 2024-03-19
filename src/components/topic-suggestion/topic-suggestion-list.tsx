"use client";

import { useGenerateTopicSuggestions, useTopicSuggestions } from "~/hooks";
import { Button } from "../ui";
import { RefreshCw } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export const TopicSuggestionList = ({ meetingId }: { meetingId: string }) => {
  const topicSuggestions = useTopicSuggestions({ meetingId });

  const generateTopicSuggestionsMutation = useGenerateTopicSuggestions();

  const renderTopicSuggestions = () => {
    if (generateTopicSuggestionsMutation.isPending) {
      return (
        <ul className="flex flex-col gap-1">
          <li className="flex items-center gap-3">
            <Skeleton className="h-1 w-1 rounded-full bg-foreground/25" />
            <Skeleton className="h-5 w-64" />
          </li>
          <li className="flex items-center gap-3">
            <Skeleton className="h-1 w-1 rounded-full bg-foreground/25" />
            <Skeleton className="h-5 w-56" />
          </li>
          <li className="flex items-center gap-3">
            <Skeleton className="h-1 w-1 rounded-full bg-foreground/25" />
            <Skeleton className="h-5 w-72" />
          </li>
          <li className="flex items-center gap-3">
            <Skeleton className="h-1 w-1 rounded-full bg-foreground/25" />
            <Skeleton className="h-5 w-52" />
          </li>
        </ul>
      );
    }

    if (topicSuggestions.data.length > 0) {
      return (
        <ul className="text-sm">
          {topicSuggestions.data.map((topicSuggestion) => (
            <li key={topicSuggestion.id} className="flex items-center gap-3">
              <div className="h-1 w-1 rounded-full bg-foreground/25" />
              <div>{topicSuggestion.content}</div>
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <div className="text-sm text-muted-foreground">No suggested topics</div>
      );
    }
  };

  return (
    <div className="relative flex flex-col gap-1.5 rounded-md border p-3 pt-4">
      <div className="absolute left-0 top-0 -translate-y-2 translate-x-5 bg-background px-2 text-xs text-muted-foreground">
        Suggested discussion topics
      </div>
      {renderTopicSuggestions()}
      <Button
        variant="outline"
        className="h-fit w-fit px-2 py-1 text-xs"
        disabled={generateTopicSuggestionsMutation.isPending}
        onClick={async () => {
          await generateTopicSuggestionsMutation.mutateAsync({ meetingId });
        }}
      >
        <RefreshCw className="mr-2 h-3 w-3" />
        Regenerate
      </Button>
    </div>
  );
};
