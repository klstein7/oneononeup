"use client";

import { useGenerateTopicSuggestions, useTopicSuggestions } from "~/hooks";
import { Button } from "../ui";
import { RefreshCw } from "lucide-react";

export const TopicSuggestionList = ({ meetingId }: { meetingId: string }) => {
  const topicSuggestions = useTopicSuggestions({ meetingId });

  const generateTopicSuggestionsMutation = useGenerateTopicSuggestions();

  return (
    <div className="relative flex flex-col gap-1.5 rounded-md border p-3 pt-4">
      <div className="absolute left-0 top-0 -translate-y-2 translate-x-5 bg-background px-2 text-xs text-muted-foreground">
        Suggested discussion topics
      </div>
      {topicSuggestions.data.length > 0 ? (
        <ul className="text-sm">
          {topicSuggestions.data.map((topicSuggestion) => (
            <li key={topicSuggestion.id} className="flex items-center gap-3">
              <div className="h-1 w-1 rounded-full bg-foreground/25" />
              <div>{topicSuggestion.content}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-muted-foreground">No suggested topics</div>
      )}
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
