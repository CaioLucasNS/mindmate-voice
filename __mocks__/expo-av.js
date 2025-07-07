/* eslint-disable */
export const Audio = {
  RecordingOptionsPresets: {
    HIGH_QUALITY: {
      android: {},
      ios: {},
      web: {},
    },
  },
  setAudioModeAsync: jest.fn(),
  requestPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  getPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),

  // Mock correto: método estático direto em Recording
  Recording: {
    createAsync: jest.fn().mockResolvedValue({
      recording: {
        startAsync: jest.fn(),
        stopAndUnloadAsync: jest.fn(),
        getURI: jest.fn().mockReturnValue('mock-uri'),
        getStatusAsync: jest.fn().mockResolvedValue({
          isRecording: true,
          durationMillis: 1000,
        }),
      },
      sound: {
        playAsync: jest.fn(),
        unloadAsync: jest.fn(),
      },
      status: {},
    }),
  },
};
