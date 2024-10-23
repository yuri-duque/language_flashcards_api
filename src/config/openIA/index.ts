import CustomError, { STATUS } from '@/utils/customError';
import OpenAIBase from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

export class OpenAI {
  readonly openai;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    const organization = process.env.OPENAI_ORGANIZATION_ID;
    const project = process.env.OPENAI_PROJECT_ID;

    if (!apiKey || !organization || !project) {
      throw new CustomError('ENVS is not defined', STATUS.error);
    }

    this.openai = new OpenAIBase({ apiKey, organization, project });
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
