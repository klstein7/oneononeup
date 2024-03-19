"use client";

import { type API } from "~/server/api";

export const TopicSuggestionList = ({
  topicSuggestions,
}: {
  topicSuggestions: API["meeting"]["find"][number]["topicSuggestions"];
}) => {
  return (
    <div className="relative flex flex-col gap-1.5 rounded-md border p-3 pt-4">
      <div className="absolute left-0 top-0 -translate-y-2 translate-x-5 bg-background px-2 text-xs text-muted-foreground">
        Suggested discussion topics
      </div>
      <ul className="text-sm">
        {topicSuggestions.map((topicSuggestion) => (
          <li key={topicSuggestion.id} className="flex items-center gap-3">
            <div className="h-1 w-1 rounded-full bg-foreground/25" />
            <div>{topicSuggestion.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
