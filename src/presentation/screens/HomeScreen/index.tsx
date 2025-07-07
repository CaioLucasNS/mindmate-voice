import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useThemeColors } from '@/presentation/themes/useThemeColors';
import { VoiceAICard } from '@/presentation/components/VoiceAICard';
import { VoiceAIButton } from '@/presentation/components/VoiceAIButton';
import { ThemeToggleButton } from '@/presentation/components/ThemeToggleButton';
import { TranscribedTextCard } from '@/presentation/components/TranscribedTextCard';
import { ErrorMessageCard } from '@/presentation/components/ErrorMessageCard';
import { useVoiceRecognition } from '@/presentation/hooks/useVoiceRecognition';

const HomeScreen = () => {
  const colors = useThemeColors();
  const {
    isRecording,
    transcribedText,
    isProcessing,
    error,
    startRecording,
    stopRecording,
    clearText,
    clearError,
    isUsingAPI,
  } = useVoiceRecognition();

  const handleVoiceButtonPress = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Botão de alternância de tema no topo direito */}
      <View style={styles.themeToggleContainer}>
        <ThemeToggleButton />
      </View>

      {/* Card de boas-vindas */}
      <VoiceAICard
        style={styles.card}
        subtitle='Reconhecimento de voz inteligente'
        title='MindMate Voice'
        type='voice'
      >
        <Text style={styles.cardText}>
          Fale naturalmente e deixe a IA processar suas palavras. Transforme sua voz em texto e
          obtenha respostas inteligentes instantaneamente.
        </Text>
      </VoiceAICard>

      {/* Card de erro */}
      <ErrorMessageCard error={error || ''} onDismiss={clearError} />

      {/* Card de texto transcrito */}
      <TranscribedTextCard
        isProcessing={isProcessing}
        isUsingAPI={isUsingAPI}
        text={transcribedText}
        onClear={clearText}
      />

      {/* Botão de ação principal */}
      <VoiceAIButton
        fullWidth
        loading={isProcessing}
        size='large'
        style={styles.button}
        title={isRecording ? 'Parar Gravação' : 'Iniciar Reconhecimento'}
        variant='voice'
        onPress={handleVoiceButtonPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    maxWidth: 400,
    width: '100%',
  },
  card: {
    marginBottom: 32,
    maxWidth: 400,
    width: '100%',
  },
  cardText: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  themeToggleContainer: {
    position: 'absolute',
    right: 24,
    top: 32,
    zIndex: 10,
  },
});

export default HomeScreen;
