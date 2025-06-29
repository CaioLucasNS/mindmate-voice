import { useState } from 'react';

import { Audio } from 'expo-av';

export function useAudioRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [uri, setUri] = useState<string | null>(null);

  async function startRecording() {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (!status || status !== 'granted') return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await newRecording.startAsync();

      setRecording(newRecording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    try {
      if (!recording) return;
      await recording.stopAndUnloadAsync();

      const uri = recording.getURI();
      setUri(uri ?? null);
      setRecording(null);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  }

  return {
    recording,
    uri,
    startRecording,
    stopRecording,
  };
}
