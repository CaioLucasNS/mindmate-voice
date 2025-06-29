import { StyleSheet } from 'react-native';

import { colors } from '@/shared/constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  result: {
    color: colors.textPrimary,
    fontSize: 16,
    marginTop: 20,
  },
});
