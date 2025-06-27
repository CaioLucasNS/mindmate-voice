import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';

import { summarizeAudio } from '@/services/openai/summarizeAudio';

import styles from './styles';

export function AudioSummaryScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setIsLoading(true);
    recording && (await recording.stopAndUnloadAsync());
    const uri = recording?.getURI();

    if (!uri) return;

    const summaryResult = await summarizeAudio(uri);
    setSummary(summaryResult);
    setRecording(null);
    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <Button title={recording ? 'Stop Recording' : 'Start Recording'} onPress={recording ? stopRecording : startRecording} />
      {isLoading && <ActivityIndicator />}
      {summary && <Text style={styles.result}>{summary}</Text>}
    </View>
  );
}
