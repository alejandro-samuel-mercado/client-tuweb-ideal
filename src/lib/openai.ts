import OpenAI from "openai";
import Logger from "./logger";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  Logger.warn("OPENAI_API_KEY is not set. Chatbot will use local responses only.");
}

export const openai = new OpenAI({
  apiKey: apiKey,
});
