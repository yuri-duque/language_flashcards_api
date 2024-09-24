import { IAService } from '../IAService';
import { TranslateResult } from './types';

export class TranslateService {
  private readonly IAService: IAService;
  private originalLanguage = 'english';
  private targetLanguage = 'portuguese';
  private systemMessage = `You are a ${this.originalLanguage} teacher.`;
  private userMessage = `Translate the words below to ${this.targetLanguage}, give only the translation: `;
  private resultMessage = `give me the result in this format {"text": "translated text"}`;

  constructor() {
    this.IAService = new IAService();
  }

  async translate(text: string) {
    try {
      let response = await this.IAService.chat([
        { role: 'system', content: this.systemMessage },
        {
          role: 'user',
          content: `${this.userMessage} '${text}', ${this.resultMessage}`,
        },
      ]);

      if (response) {
        const typedResponse = JSON.parse(response) as TranslateResult;
        return typedResponse.text;
      }

      return undefined;
    } catch (error) {
      console.error('error to translate text', error);
      return undefined;
    }
  }
}
