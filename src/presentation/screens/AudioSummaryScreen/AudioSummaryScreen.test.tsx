import React from 'react';

import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { AudioSummaryScreen } from '.';

jest.mock('expo-av');
jest.mock('@/services/openai/summarizeAudio', () => ({
  summarizeAudio: jest.fn(() => Promise.resolve('Resumo simulado')),
}));

describe('AudioSummaryScreen', () => {
  it('renderiza corretamente e alterna gravação', async () => {
    const { getByText } = render(<AudioSummaryScreen />);
    const startButton = getByText('Start Recording');
    expect(startButton).toBeTruthy();

    await waitFor(() => {
      fireEvent.press(startButton);
    });
  });
});
