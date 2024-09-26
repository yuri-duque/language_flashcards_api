import { LanguageService } from './index';

const mockChat = jest.fn();
jest.mock('../IAService', () => ({
  IAService: class {
    chat = (prop) => mockChat(prop);
  },
}));

describe('LanguageService', () => {
  let languageService: LanguageService;

  beforeAll(() => {});

  beforeEach(() => {
    process.env.LANGUAGE_SYSTEM_PRONPT = 'system prompt <<textLanguage>>';
    process.env.LANGUAGE_EXEMPLE_PRONPT = 'example prompt <<quantity>>, <<textLanguage>>, <<text>>';
    process.env.LANGUAGE_TRANSLATE_PRONPT = 'translate prompt <<targetLanguage>>, <<text>>';

    languageService = new LanguageService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should throw an error if systemPronpt is not defined', () => {
    delete process.env.LANGUAGE_SYSTEM_PRONPT;
    expect(() => new LanguageService()).toThrow('systemPronpt is not defined');
  });

  it('should throw an error if exemplePronpt is not defined', () => {
    delete process.env.LANGUAGE_EXEMPLE_PRONPT;
    expect(() => new LanguageService()).toThrow('exemplePronpt is not defined');
  });

  it('should throw an error if translatePronpt is not defined', () => {
    delete process.env.LANGUAGE_TRANSLATE_PRONPT;
    expect(() => new LanguageService()).toThrow('translatePronpt is not defined');
  });

  describe('translate', () => {
    it('should throw an error if text is not provided', async () => {
      await expect(languageService.translate({ text: '' })).rejects.toThrow('text is required');
    });

    it('should return translated text when IAService returns a valid response', async () => {
      const mockResponse = JSON.stringify({ text: 'translated text' });
      mockChat.mockResolvedValueOnce(mockResponse);

      const result = await languageService.translate({
        text: 'texto traduzido',
        textLanguage: 'portuguese',
        targetLanguage: 'english',
      });

      const expected = [
        {
          role: 'system',
          content: 'system prompt portuguese',
        },
        {
          role: 'user',
          content: 'translate prompt english, texto traduzido',
        },
      ];

      expect(result).toBe('translated text');
      expect(mockChat).toHaveBeenCalledWith(expected);
    });

    it('should return translated text when when received only text', async () => {
      const mockResponse = JSON.stringify({ text: 'texto traduzido' });
      mockChat.mockResolvedValueOnce(mockResponse);

      const result = await languageService.translate({
        text: 'translated text',
      });

      const expected = [
        {
          role: 'system',
          content: 'system prompt english',
        },
        {
          role: 'user',
          content: 'translate prompt portuguese, translated text',
        },
      ];

      expect(result).toBe('texto traduzido');
      expect(mockChat).toHaveBeenCalledWith(expected);
    });

    it('should return undefined when IAService response is empty', async () => {
      mockChat.mockResolvedValue(null);

      const result = await languageService.translate({ text: 'text' });
      expect(result).toBeUndefined();
    });

    it('should handle errors gracefully', async () => {
      mockChat.mockRejectedValue(new Error('Network error'));

      const result = await languageService.translate({ text: 'text' });
      expect(result).toBeUndefined();
    });
  });

  describe('generateExemples', () => {
    it('should throw an error if text is not provided', async () => {
      await expect(languageService.generateExemples({ text: '' })).rejects.toThrow(
        'text is required',
      );
    });

    it('should return examples when IAService returns a valid response', async () => {
      const mockResponse = JSON.stringify({ exemples: ['exemplo1', 'exemplo2'] });
      mockChat.mockResolvedValueOnce(mockResponse);

      const result = await languageService.generateExemples({
        text: 'text',
        textLanguage: 'english',
        quantity: 2,
      });

      const expected = [
        {
          role: 'system',
          content: 'system prompt english',
        },
        {
          role: 'user',
          content: 'example prompt 2, english, text',
        },
      ];

      expect(result).toEqual(['exemplo1', 'exemplo2']);
      expect(mockChat).toHaveBeenCalledWith(expected);
    });

    it('should return examples when received only text', async () => {
      const mockResponse = JSON.stringify({ exemples: ['exemplo1', 'exemplo2', 'exemplo3'] });
      mockChat.mockResolvedValueOnce(mockResponse);

      const result = await languageService.generateExemples({
        text: 'text',
      });

      const expected = [
        {
          role: 'system',
          content: 'system prompt english',
        },
        {
          role: 'user',
          content: 'example prompt 3, english, text',
        },
      ];

      expect(result).toEqual(['exemplo1', 'exemplo2', 'exemplo3']);
      expect(mockChat).toHaveBeenCalledWith(expected);
    });

    it('should return undefined when IAService response is empty', async () => {
      mockChat.mockResolvedValueOnce(null);

      const result = await languageService.generateExemples({ text: 'text' });
      expect(result).toBeUndefined();
    });

    it('should handle errors gracefully', async () => {
      mockChat.mockRejectedValue(new Error('Network error'));

      const result = await languageService.generateExemples({ text: 'text' });
      expect(result).toBeUndefined();
    });
  });
});
