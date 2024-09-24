import { IAService } from '../IAService';
import { GenerateResult } from './types';

export class GenerateExemples {
  private readonly IAService: IAService;
  private originalLanguage = 'english';
  private systemMessage = `You are a ${this.originalLanguage} teacher.`;
  private userMessage = `Generate 3 simple sentences in ${this.originalLanguage} that can be used in everyday life, using the word `;
  private resultMessage = 'give me the result in this format {"exemples": ["exemple 1", "exemple 2", "exemple 3"]}';

  constructor() {
    this.IAService = new IAService();
  }

  async generate(text: string) {
    try {
      const response = await this.IAService.chat([
        { role: 'system', content: this.systemMessage },
        {
          role: 'user',
          content: `${this.userMessage} '${text}', ${this.resultMessage}`,
        },
      ]);

      if (response) {
        const typedResponse = JSON.parse(response) as GenerateResult;
        return typedResponse.exemples;
      }

      return undefined;
    } catch (error) {
      console.error('error to generate exemples', error);
      return undefined;
    }
  }
}
