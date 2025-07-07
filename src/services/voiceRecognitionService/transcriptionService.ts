export interface TranscriptionResult {
  text: string;
  confidence?: number;
  language?: string;
}

export interface TranscriptionService {
  transcribe(audioUri: string): Promise<TranscriptionResult>;
}

// Constante para delay de processamento
const PROCESSING_DELAY_MS = 1000;

// Implementação real com OpenAI Whisper
export class OpenAIWhisperService implements TranscriptionService {
  private apiKey: string | undefined;
  private baseUrl: string;

  constructor(apiKey?: string, baseUrl: string = 'https://api.openai.com/v1') {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY;
    this.baseUrl = baseUrl;
  }

  async transcribe(audioUri: string): Promise<TranscriptionResult> {
    if (!this.apiKey) {
      throw new Error('OpenAI API Key não configurada');
    }
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: audioUri,
        type: 'audio/m4a',
        name: 'audio.m4a',
      } as unknown as Blob);
      formData.append('model', 'whisper-1');
      formData.append('language', 'pt');

      const response = await fetch(`${this.baseUrl}/audio/transcriptions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Erro na API OpenAI: ${response.status} - ${errorData.error?.message || response.statusText}`,
        );
      }

      const result = await response.json();
      return {
        text: result.text,
        confidence: result.confidence,
        language: result.language || 'pt',
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro na transcrição com OpenAI Whisper:', error);
      throw error;
    }
  }
}

// Exemplo de implementação com Google Speech-to-Text
export class GoogleSpeechToTextService implements TranscriptionService {
  private apiKey: string;
  private baseUrl: string;

  constructor(
    apiKey: string,
    baseUrl: string = 'https://speech.googleapis.com/v1/speech:recognize',
  ) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async transcribe(audioUri: string): Promise<TranscriptionResult> {
    try {
      const audioData = await this.readAudioFileAsBase64(audioUri);

      const requestBody = {
        config: {
          encoding: 'LINEAR16',
          sampleRateHertz: 16000,
          languageCode: 'pt-BR',
          enableAutomaticPunctuation: true,
        },
        audio: {
          content: audioData,
        },
      };

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const result = await response.json();

      if (result.results && result.results.length > 0) {
        const transcript = result.results[0].alternatives[0];
        return {
          text: transcript.transcript,
          confidence: transcript.confidence,
          language: 'pt-BR',
        };
      }

      return {
        text: '',
        confidence: 0,
        language: 'pt-BR',
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro na transcrição com Google Speech-to-Text:', error);
      throw error;
    }
  }

  private async readAudioFileAsBase64(_uri: string): Promise<string> {
    return new Promise(resolve => {
      resolve('mock-base64-audio-data');
    });
  }
}

// Serviço mock para desenvolvimento (fallback)
export class MockTranscriptionService implements TranscriptionService {
  async transcribe(_audioUri: string): Promise<TranscriptionResult> {
    await new Promise(resolve => setTimeout(resolve, PROCESSING_DELAY_MS));

    const mockTexts = [
      'Olá, como você está hoje?',
      'Este é um teste de reconhecimento de voz',
      'A inteligência artificial está revolucionando o mundo',
      'Obrigado por usar o MindMate Voice',
    ];

    const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];

    return {
      text: randomText,
      confidence: 0.95,
      language: 'pt-BR',
    };
  }
}
