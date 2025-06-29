import React from 'react';

import { View, Button, Text } from 'react-native';

import { useAudioRecorder } from '../hooks/useAudioRecorder';

import { styles } from './styles';

export const AudioRecorder = () => {
  const { recording, uri, startRecording, stopRecording } = useAudioRecorder();

  return (
    <View style={styles.container}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      {uri && <Text style={styles.audioText}>🎧 Audio saved at: {uri}</Text>}
    </View>
  );
};
