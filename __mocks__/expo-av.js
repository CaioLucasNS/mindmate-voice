export const Audio = {
  RecordingOptionsPresets: {
    HIGH_QUALITY: {
      android: {},
      ios: {},
      web: {},
    },
  },
  setAudioModeAsync: jest.fn(),
  requestPermissionsAsync: jest.fn().mockResolvedValue({ granted: true }),
  getPermissionsAsync: jest.fn().mockResolvedValue({ granted: true }),

  // Mock correto: método estático direto em Recording
  Recording: {
    createAsync: jest.fn().mockResolvedValue({
      recording: {
        startAsync: jest.fn(),
        stopAndUnloadAsync: jest.fn(),
        getURI: jest.fn().mockReturnValue('mock-uri'),
      },
      sound: {
        playAsync: jest.fn(),
        unloadAsync: jest.fn(),
      },
      status: {},
    }),
  },
};
