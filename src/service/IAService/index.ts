import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

export class IAService {
  readonly openai;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    const organization = process.env.OPENAI_ORGANIZATION_ID;
    const project = process.env.OPENAI_PROJECT_ID;

    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not defined');
    }

    if (!organization) {
      throw new Error('OPENAI_ORGANIZATION_ID is not defined');
    }

    if (!project) {
      throw new Error('OPENAI_PROJECT_ID is not defined');
    }

    this.openai = new OpenAI({ apiKey, organization, project });
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
