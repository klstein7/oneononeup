import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { topicSuggestions } from "~/server/db/schema";

export const TopicSuggestion = createSelectSchema(topicSuggestions, {
  content: (schema) =>
    schema.content.describe("The content of the topic suggestion"),
});

export const TopicSuggestionGenerateOutput = z.object({
  topics: z
    .array(
      TopicSuggestion.pick({
        content: true,
      }),
    )
    .describe("The list of topic suggestions"),
});

export const TopicSuggestionFindInput = createSelectSchema(
  topicSuggestions,
).pick({
  meetingId: true,
});

export const TopicSuggestionGenerateInput = z.object({
  meetingId: z.string(),
});
