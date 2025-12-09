import OpenAI from "openai";
import { PROXY } from "./constants";
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: PROXY,
  dangerouslyAllowBrowser: true,
});

export default client;
