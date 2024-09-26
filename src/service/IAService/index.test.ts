import OpenAI from 'openai';
import { IAService } from './index';

const mockChatCreate = jest.fn();
jest.mock('openai', () => ({
  __esModule: true,
  default: class {
    chat = {
      completions: {
        create: (prop) => mockChatCreate(prop),
      },
    };
  },
}));

describe('IAService', () => {
  let iaService;

  beforeEach(() => {
    process.env.OPENAI_API_KEY = 'test-api-key';
    process.env.OPENAI_ORGANIZATION_ID = 'test-organization-id';
    process.env.OPENAI_PROJECT_ID = 'test-project-id';

    iaService = new IAService();
    mockChatCreate.mockClear();
  });

  it('should throw an error if OPENAI_API_KEY is not defined', () => {
    delete process.env.OPENAI_API_KEY;
    expect(() => new IAService()).toThrow('OPENAI_API_KEY is not defined');
  });

  it('should throw an error if OPENAI_ORGANIZATION_ID is not defined', () => {
    delete process.env.OPENAI_ORGANIZATION_ID;
    expect(() => new IAService()).toThrow('OPENAI_ORGANIZATION_ID is not defined');
  });

  it('should throw an error if OPENAI_PROJECT_ID is not defined', () => {
    delete process.env.OPENAI_PROJECT_ID;
    expect(() => new IAService()).toThrow('OPENAI_PROJECT_ID is not defined');
  });

  describe('chat', () => {
    it('should return the response content when OpenAI returns a valid response', async () => {
      mockChatCreate.mockResolvedValueOnce({
        choices: [{ message: { content: 'mocked response' } }],
      });

      const messages = [{ role: 'user', content: 'Hello' }];
      const result = await iaService.chat(messages);

      expect(result).toBe('mocked response');
      expect(mockChatCreate).toHaveBeenCalledWith({
        model: 'gpt-4o-mini',
        messages,
      });
    });

    it('should return undefined when OpenAI response is empty', async () => {
      mockChatCreate.mockResolvedValueOnce({
        choices: [{ message: { content: '' } }],
      });

      const messages = [{ role: 'user', content: 'Hello' }];
      const result = await iaService.chat(messages);

      expect(result).toBeUndefined();
    });

    it('should catch and log an error if the OpenAI chat fails', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      mockChatCreate.mockRejectedValueOnce(new Error('API error'));

      const messages = [{ role: 'user', content: 'Hello' }];
      const result = await iaService.chat(messages);

      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalledWith('error to chat', expect.any(Error));

      consoleErrorSpy.mockRestore();
    });
  });
});
