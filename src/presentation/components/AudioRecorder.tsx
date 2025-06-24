import React from 'react';
import { View, Button, Text } from 'react-native';
import { useAudioRecorder } from '../hooks/useAudioRecorder';

export function AudioRecorder() {
  const { recording, uri, startRecording, stopRecording } = useAudioRecorder();

  return (
    <View style={{ padding: 16 }}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      {uri && <Text style={{ marginTop: 10 }}>🎧 Audio saved at: {uri}</Text>}
    </View>
  );
}
