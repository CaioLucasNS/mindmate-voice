import { Audio } from 'expo-av';
import {
  MockTranscriptionService,
  TranscriptionService,
  OpenAIWhisperService,
} from './transcriptionService';

export interface VoiceRecognitionResult {
  text: string;
  isFinal: boolean;
  error?: string;
}

export class VoiceRecognitionService {
  private recording: Audio.Recording | null = null;
  private isRecording = false;
  private transcriptionService: TranscriptionService;

  constructor(transcriptionService?: TranscriptionService) {
    // Usar OpenAI Whisper se a API key estiver disponível, senão usar mock
    if (process.env.OPENAI_API_KEY && transcriptionService === undefined) {
      this.transcriptionService = new OpenAIWhisperService();
    } else {
      this.transcriptionService = transcriptionService || new MockTranscriptionService();
    }
  }

  async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro ao solicitar permissões de áudio:', error);
      return false;
    }
  }

  async startRecording(): Promise<void> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        throw new Error('Permissão de áudio não concedida');
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );

      this.recording = recording;
      this.isRecording = true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro ao iniciar gravação:', error);
      throw error;
    }
  }

  async stopRecording(): Promise<string> {
    try {
      if (!this.recording || !this.isRecording) {
        throw new Error('Nenhuma gravação em andamento');
      }

      await this.recording.stopAndUnloadAsync();
      const uri = this.recording.getURI();

      this.recording = null;
      this.isRecording = false;

      if (!uri) {
        throw new Error('URI da gravação não encontrada');
      }

      return uri;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro ao parar gravação:', error);
      throw error;
    }
  }

  async transcribeAudio(audioUri: string): Promise<string> {
    try {
      const result = await this.transcriptionService.transcribe(audioUri);
      return result.text;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro na transcrição:', error);
      throw error;
    }
  }

  isCurrentlyRecording(): boolean {
    return this.isRecording;
  }

  async getRecordingStatus(): Promise<Audio.RecordingStatus | null> {
    if (!this.recording) {
      return null;
    }

    try {
      return await this.recording.getStatusAsync();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro ao obter status da gravação:', error);
      return null;
    }
  }

  // Método para verificar se está usando a API real
  isUsingAPI(): boolean {
    return this.transcriptionService instanceof OpenAIWhisperService;
  }
}

export const voiceRecognitionService = new VoiceRecognitionService();
