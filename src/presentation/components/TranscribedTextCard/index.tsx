import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, IconButton, Chip } from 'react-native-paper';
import { useThemeColors } from '@/presentation/themes/useThemeColors';

interface TranscribedTextCardProps {
  text: string;
  isProcessing: boolean;
  isUsingAPI?: boolean;
  onClear: () => void;
}

export const TranscribedTextCard: React.FC<TranscribedTextCardProps> = ({
  text,
  isProcessing,
  isUsingAPI = false,
  onClear,
}) => {
  const colors = useThemeColors();

  if (!text && !isProcessing) {
    return null;
  }

  return (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.onSurface }]}>Texto Reconhecido</Text>
            {isUsingAPI && (
              <Chip
                icon='check-circle'
                style={[styles.apiChip, { backgroundColor: colors.success.main }]}
                textStyle={{ color: colors.onSurface }}
              >
                <Text style={{ color: colors.onSurface }}>OpenAI</Text>
              </Chip>
            )}
          </View>
          {text && (
            <IconButton icon='close' iconColor={colors.onSurface} size={20} onPress={onClear} />
          )}
        </View>

        <View style={styles.textContainer}>
          {isProcessing ? (
            <View style={styles.processingContainer}>
              <Text style={[styles.processingText, { color: colors.primary }]}>
                {isUsingAPI ? 'Processando com OpenAI Whisper...' : 'Processando áudio...'}
              </Text>
            </View>
          ) : (
            <Text style={[styles.transcribedText, { color: colors.onSurface }]}>{text}</Text>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  apiChip: {
    marginLeft: 8,
  },
  card: {
    marginBottom: 16,
    maxWidth: 400,
    width: '100%',
  },
  content: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  processingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minHeight: 60,
  },
  processingText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  textContainer: {
    minHeight: 60,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  transcribedText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
