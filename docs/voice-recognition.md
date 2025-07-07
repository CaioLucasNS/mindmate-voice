# Reconhecimento de Voz - MindMate Voice

Esta documentação descreve a implementação da funcionalidade de reconhecimento de voz no MindMate Voice.

## Funcionalidades Implementadas

### 1. Gravação de Áudio

- Captura de áudio usando `expo-av`
- Configuração automática de permissões
- Suporte para iOS e Android
- Qualidade de áudio otimizada

### 2. Feedback Visual

- **TranscribedTextCard**: Exibe o texto reconhecido
- **ErrorMessageCard**: Mostra erros de forma amigável
- **Estado de Loading**: Indicador visual durante processamento
- **Botão Dinâmico**: Muda entre "Iniciar" e "Parar" gravação

### 3. Serviços de Transcrição

- **MockTranscriptionService**: Para desenvolvimento e testes
- **OpenAIWhisperService**: Integração com OpenAI Whisper
- **GoogleSpeechToTextService**: Integração com Google Speech-to-Text

## Estrutura dos Arquivos

```
src/
├── services/
│   └── voiceRecognitionService/
│       ├── index.ts                    # Serviço principal
│       └── transcriptionService.ts     # Serviços de transcrição
├── presentation/
│   ├── hooks/
│   │   └── useVoiceRecognition.ts      # Hook personalizado
│   ├── components/
│   │   ├── TranscribedTextCard/        # Card de texto transcrito
│   │   └── ErrorMessageCard/           # Card de erro
│   └── screens/
│       └── HomeScreen/                 # Tela principal
```

## Como Usar

### 1. Uso Básico

```typescript
import { useVoiceRecognition } from '@/presentation/hooks/useVoiceRecognition';

const MyComponent = () => {
  const {
    isRecording,
    transcribedText,
    isProcessing,
    error,
    startRecording,
    stopRecording,
    clearText,
    clearError,
  } = useVoiceRecognition();

  const handleVoiceButtonPress = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  return (
    <View>
      <VoiceAIButton
        title={isRecording ? 'Parar Gravação' : 'Iniciar Reconhecimento'}
        loading={isProcessing}
        onPress={handleVoiceButtonPress}
      />

      <TranscribedTextCard
        text={transcribedText}
        isProcessing={isProcessing}
        onClear={clearText}
      />

      <ErrorMessageCard error={error || ''} onDismiss={clearError} />
    </View>
  );
};
```

### 2. Integração com OpenAI Whisper

```typescript
import { OpenAIWhisperService } from '@/services/voiceRecognitionService/transcriptionService';
import { VoiceRecognitionService } from '@/services/voiceRecognitionService';

// Configurar o serviço
const whisperService = new OpenAIWhisperService('sua-api-key-aqui');
const voiceService = new VoiceRecognitionService(whisperService);

// Usar no hook
const { startRecording, stopRecording } = useVoiceRecognition();
```

### 3. Integração com Google Speech-to-Text

```typescript
import { GoogleSpeechToTextService } from '@/services/voiceRecognitionService/transcriptionService';
import { VoiceRecognitionService } from '@/services/voiceRecognitionService';

// Configurar o serviço
const googleService = new GoogleSpeechToTextService('sua-api-key-aqui');
const voiceService = new VoiceRecognitionService(googleService);
```

## Estados da Aplicação

### Estados do Hook `useVoiceRecognition`

- **isRecording**: `boolean` - Indica se está gravando
- **transcribedText**: `string` - Texto transcrito
- **isProcessing**: `boolean` - Indica se está processando
- **error**: `string | null` - Mensagem de erro

### Fluxo de Funcionamento

1. **Iniciar Gravação**: Usuário clica no botão
2. **Solicitar Permissões**: Sistema verifica permissões de áudio
3. **Configurar Áudio**: Configura modo de áudio
4. **Iniciar Captura**: Começa a gravar áudio
5. **Parar Gravação**: Usuário clica novamente
6. **Processar Áudio**: Envia para serviço de transcrição
7. **Exibir Resultado**: Mostra texto transcrito

## Configuração de Ambiente

### Variáveis de Ambiente

Para usar serviços reais de transcrição, configure as seguintes variáveis:

```env
# OpenAI Whisper
OPENAI_API_KEY=sua-chave-aqui

# Google Speech-to-Text
GOOGLE_SPEECH_API_KEY=sua-chave-aqui
```

### Permissões

O app solicita automaticamente as seguintes permissões:

- **iOS**: `NSMicrophoneUsageDescription`
- **Android**: `RECORD_AUDIO`

## Tratamento de Erros

A implementação inclui tratamento robusto de erros:

- **Permissões negadas**: Mensagem clara para o usuário
- **Falha na gravação**: Retry automático
- **Erro de transcrição**: Fallback para texto de exemplo
- **Erro de rede**: Timeout e retry

## Testes

### Mock para Testes

O projeto inclui mocks completos para testes:

```typescript
// __mocks__/expo-av.js
export const Audio = {
  requestPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  Recording: {
    createAsync: jest.fn().mockResolvedValue({
      recording: {
        stopAndUnloadAsync: jest.fn(),
        getURI: jest.fn().mockReturnValue('mock-uri'),
      },
    }),
  },
};
```

### Executar Testes

```bash
npm test
npm run test:watch
```

## Próximos Passos

### Melhorias Sugeridas

1. **Reconhecimento em Tempo Real**: Usar WebSocket para streaming
2. **Múltiplos Idiomas**: Suporte para diferentes idiomas
3. **Punctuation**: Adicionar pontuação automática
4. **Confidence Score**: Mostrar confiança da transcrição
5. **Histórico**: Salvar transcrições anteriores
6. **Export**: Exportar transcrições em diferentes formatos

### Integrações Adicionais

- **Azure Speech Services**
- **Amazon Transcribe**
- **IBM Watson Speech to Text**
- **Mozilla DeepSpeech** (offline)

## Troubleshooting

### Problemas Comuns

1. **Permissões negadas**: Verificar configuração no app.json
2. **Áudio não capturado**: Verificar microfone do dispositivo
3. **Transcrição falha**: Verificar API key e conectividade
4. **Performance lenta**: Otimizar qualidade de áudio

### Logs de Debug

Ative logs detalhados para debug:

```typescript
// No serviço de transcrição
console.log('Transcrevendo áudio:', audioUri);
console.log('Resultado da transcrição:', result);
```

## Contribuição

Para contribuir com melhorias na funcionalidade de reconhecimento de voz:

1. Siga os padrões de código estabelecidos
2. Adicione testes para novas funcionalidades
3. Atualize a documentação
4. Teste em dispositivos reais (iOS e Android)
