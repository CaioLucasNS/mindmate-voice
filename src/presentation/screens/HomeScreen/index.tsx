import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useThemeColors } from '@/presentation/themes/useThemeColors';
import { VoiceAICard } from '@/presentation/components/VoiceAICard';
import { VoiceAIButton } from '@/presentation/components/VoiceAIButton';
import { ThemeToggleButton } from '@/presentation/components/ThemeToggleButton';

const HomeScreen = () => {
  const colors = useThemeColors();

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

      {/* Botão de ação principal */}
      <VoiceAIButton
        fullWidth
        size='large'
        style={styles.button}
        title='Iniciar Reconhecimento'
        variant='voice'
        onPress={() => {
          console.log('Iniciar Reconhecimento');
          /* iniciar reconhecimento de voz */
        }}
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
