import { OpenAIWhisperService, MockTranscriptionService } from '../transcriptionService';

// Mock das variáveis de ambiente
jest.mock('@env', () => ({
  OPENAI_API_KEY: 'test-api-key',
}));

// Mock do fetch global
global.fetch = jest.fn();

describe('TranscriptionService', () => {
  describe('OpenAIWhisperService', () => {
    let service: OpenAIWhisperService;

    beforeEach(() => {
      service = new OpenAIWhisperService();
      jest.clearAllMocks();
    });

    it('should be instantiated with API key', () => {
      expect(service).toBeInstanceOf(OpenAIWhisperService);
    });

    it('should throw error if API key is not configured', async () => {
      const serviceWithoutKey = new OpenAIWhisperService('');
      await expect(serviceWithoutKey.transcribe('test-uri')).rejects.toThrow(
        'OpenAI API Key não configurada',
      );
    });

    it('should handle successful API response', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          text: 'Texto transcrito de teste',
          language: 'pt',
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await service.transcribe('test-uri');

      expect(result.text).toBe('Texto transcrito de teste');
      expect(result.language).toBe('pt');
    });

    it('should handle API error response', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        json: jest.fn().mockResolvedValue({
          error: { message: 'Invalid API key' },
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(service.transcribe('test-uri')).rejects.toThrow(
        'Erro na API OpenAI: 401 - Invalid API key',
      );
    });
  });

  describe('MockTranscriptionService', () => {
    let service: MockTranscriptionService;

    beforeEach(() => {
      service = new MockTranscriptionService();
    });

    it('should return mock text after delay', async () => {
      const result = await service.transcribe('test-uri');

      expect(result).toHaveProperty('text');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('language');
      expect(typeof result.text).toBe('string');
      expect(result.text.length).toBeGreaterThan(0);
      expect(result.confidence).toBe(0.95);
      expect(result.language).toBe('pt-BR');
    });
  });
});
