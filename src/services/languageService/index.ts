import { OpenAI } from '@config/openIA';
import { stringInject } from '@utils/stringInject';
import {
  GenerateExemplesParams,
  GenerateExemplesResult,
  TranslateParams,
  TranslateResult,
} from './types';

export class LanguageService {
  private readonly IAService: OpenAI;
  private systemPronpt = process.env.LANGUAGE_SYSTEM_PRONPT || '';
  private exemplePronpt = process.env.LANGUAGE_EXEMPLE_PRONPT || '';
  private translatePronpt = process.env.LANGUAGE_TRANSLATE_PRONPT || '';

  constructor() {
    this.IAService = new OpenAI();

    if (!this.systemPronpt) {
      throw new Error('systemPronpt is not defined');
    }

    if (!this.exemplePronpt) {
      throw new Error('exemplePronpt is not defined');
    }

    if (!this.translatePronpt) {
      throw new Error('translatePronpt is not defined');
    }
  }

  async translate({
    text,
    textLanguage = 'english',
    targetLanguage = 'portuguese',
  }: TranslateParams) {
    if (!text) {
      throw new Error('text is required');
    }

    try {
      const systemPronpt = stringInject(this.systemPronpt, { textLanguage });
      const userPronpt = stringInject(this.translatePronpt, { text, textLanguage, targetLanguage });

      let response = await this.IAService.chat([
        { role: 'system', content: systemPronpt },
        { role: 'user', content: userPronpt },
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

  async generateExemples({ text, textLanguage = 'english', quantity = 3 }: GenerateExemplesParams) {
    if (!text) {
      throw new Error('text is required');
    }

    try {
      const systemPronpt = stringInject(this.systemPronpt, { textLanguage });
      const userPronpt = stringInject(this.exemplePronpt, {
        text,
        textLanguage,
        quantity: quantity.toString(),
      });

      const response = await this.IAService.chat([
        { role: 'system', content: systemPronpt },
        { role: 'user', content: userPronpt },
      ]);

      if (response) {
        const typedResponse = JSON.parse(response) as GenerateExemplesResult;
        return typedResponse.exemples;
      }

      return undefined;
    } catch (error) {
      console.error('error to generate exemples', error);
      return undefined;
    }
  }
}
