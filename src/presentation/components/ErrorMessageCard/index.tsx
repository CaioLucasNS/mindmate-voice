import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';
import { useThemeColors } from '@/presentation/themes/useThemeColors';

interface ErrorMessageCardProps {
  error: string;
  onDismiss: () => void;
}

export const ErrorMessageCard: React.FC<ErrorMessageCardProps> = ({ error, onDismiss }) => {
  const colors = useThemeColors();

  if (!error) {
    return null;
  }

  return (
    <Card style={[styles.card, { backgroundColor: colors.errorContainer }]}>
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.onErrorContainer }]}>Erro</Text>
          <IconButton
            icon='close'
            iconColor={colors.onErrorContainer}
            size={20}
            onPress={onDismiss}
          />
        </View>

        <Text style={[styles.errorText, { color: colors.onErrorContainer }]}>{error}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    maxWidth: 400,
    width: '100%',
  },
  content: {
    padding: 16,
  },
  errorText: {
    fontSize: 14,
    lineHeight: 20,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});
