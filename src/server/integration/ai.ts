import { OpenAI } from "openai";
import { env } from "~/env";

export const ai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});
