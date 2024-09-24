import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

export class IAService {
  readonly openai;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORGANIZATION_ID,
      project: process.env.OPENAI_PROJECT_ID,
    });
  }

  async chat(messages: Array<ChatCompletionMessageParam>) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
      });
      return (response.choices[0].message.content as string) || undefined;
    } catch (error) {
      console.error('error to chat', error);
      return undefined;
    }
  }
}
