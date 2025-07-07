import { useState, useCallback } from 'react';
import { voiceRecognitionService } from '@/services/voiceRecognitionService';

export interface VoiceRecognitionState {
  isRecording: boolean;
  transcribedText: string;
  isProcessing: boolean;
  error: string | null;
  isUsingAPI: boolean;
}

const useVoiceRecognition = () => {
  const [state, setState] = useState<VoiceRecognitionState>({
    isRecording: false,
    transcribedText: '',
    isProcessing: false,
    error: null,
    isUsingAPI: voiceRecognitionService.isUsingAPI(),
  });

  const handleStartRecording = useCallback(async () => {
    try {
      setState(prev => ({
        ...prev,
        isRecording: true,
        error: null,
        transcribedText: '',
      }));

      await voiceRecognitionService.startRecording();
    } catch (error) {
      setState(prev => ({
        ...prev,
        isRecording: false,
        error: error instanceof Error ? error.message : 'Erro ao iniciar gravação',
      }));
    }
  }, []);

  const handleStopRecording = useCallback(async () => {
    try {
      setState(prev => ({
        ...prev,
        isProcessing: true,
      }));

      const audioUri = await voiceRecognitionService.stopRecording();

      setState(prev => ({
        ...prev,
        isRecording: false,
      }));

      const transcribedText = await voiceRecognitionService.transcribeAudio(audioUri);

      setState(prev => ({
        ...prev,
        transcribedText,
        isProcessing: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isRecording: false,
        isProcessing: false,
        error: error instanceof Error ? error.message : 'Erro ao parar gravação',
      }));
    }
  }, []);

  const clearText = useCallback(() => {
    setState(prev => ({
      ...prev,
      transcribedText: '',
      error: null,
    }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
    }));
  }, []);

  return {
    ...state,
    startRecording: handleStartRecording,
    stopRecording: handleStopRecording,
    clearText,
    clearError,
  };
};

export { useVoiceRecognition };
