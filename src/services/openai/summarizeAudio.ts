import * as FileSystem from 'expo-file-system';

import { OPENAI_API_KEY } from '@env';
import axios from 'axios';

export async function summarizeAudio(uri: string): Promise<string> {
  try {
    const fileUri = uri.replace('file://', '');
    const audioBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const audioBlob = `data:audio/m4a;base64,${audioBase64}`;

    const transcriptionRes = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      {
        file: audioBlob,
        model: 'whisper-1',
        response_format: 'text',
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const transcription = transcriptionRes.data;

    const summaryRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-turbo',
        messages: [{ role: 'user', content: `Resuma este texto: ${transcription}` }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
    );

    return summaryRes.data.choices[0].message.content.trim();
  } catch (err) {
    console.error('Erro ao resumir áudio', err);
    return 'Erro ao gerar resumo';
  }
}
