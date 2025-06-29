# 🔌 API Documentation - MindMate Voice

This document provides comprehensive documentation for all APIs, interfaces, and services in the MindMate Voice application.

## 📋 Table of Contents

- [Domain Interfaces](#domain-interfaces)
- [Infrastructure Providers](#infrastructure-providers)
- [Services](#services)
- [Hooks](#hooks)
- [Contexts](#contexts)
- [Constants](#constants)
- [Error Handling](#error-handling)
- [Type Definitions](#type-definitions)

---

## 🎯 Domain Interfaces

### IOpenAIApiProvider

Interface for OpenAI API integration.

```typescript
interface IOpenAIApiProvider {
  sendPrompt(prompt: string): Promise<string>;
  getModels(): Promise<string[]>;
  getUsage(): Promise<UsageInfo>;
}
```

#### Methods

| Method       | Parameters       | Return Type          | Description                                       |
| ------------ | ---------------- | -------------------- | ------------------------------------------------- |
| `sendPrompt` | `prompt: string` | `Promise<string>`    | Sends a prompt to OpenAI and returns the response |
| `getModels`  | -                | `Promise<string[]>`  | Returns available OpenAI models                   |
| `getUsage`   | -                | `Promise<UsageInfo>` | Returns API usage information                     |

#### Example Usage

```typescript
@injectable()
export class ChatService {
  constructor(
    @inject('OpenAIApiProvider')
    private openAIApiProvider: IOpenAIApiProvider,
  ) {}

  async getResponse(message: string): Promise<string> {
    return await this.openAIApiProvider.sendPrompt(message);
  }
}
```

### IAudioRecorderProvider

Interface for audio recording functionality.

```typescript
interface IAudioRecorderProvider {
  startRecording(): Promise<void>;
  stopRecording(): Promise<string>;
  isRecording(): boolean;
  getRecordingTime(): number;
  clearRecording(): void;
}
```

#### Methods

| Method             | Parameters | Return Type       | Description                                 |
| ------------------ | ---------- | ----------------- | ------------------------------------------- |
| `startRecording`   | -          | `Promise<void>`   | Starts audio recording                      |
| `stopRecording`    | -          | `Promise<string>` | Stops recording and returns audio file path |
| `isRecording`      | -          | `boolean`         | Returns current recording status            |
| `getRecordingTime` | -          | `number`          | Returns recording duration in seconds       |
| `clearRecording`   | -          | `void`            | Clears current recording                    |

#### Example Usage

```typescript
@injectable()
export class AudioService {
  constructor(
    @inject('AudioRecorderProvider')
    private audioRecorderProvider: IAudioRecorderProvider,
  ) {}

  async recordAudio(): Promise<string> {
    await this.audioRecorderProvider.startRecording();
    // Wait for user to stop recording
    return await this.audioRecorderProvider.stopRecording();
  }
}
```

### IStorageProvider

Interface for local storage operations.

```typescript
interface IStorageProvider {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  getAllKeys(): Promise<string[]>;
}
```

#### Methods

| Method       | Parameters              | Return Type          | Description              |
| ------------ | ----------------------- | -------------------- | ------------------------ |
| `get`        | `key: string`           | `Promise<T \| null>` | Retrieves value by key   |
| `set`        | `key: string, value: T` | `Promise<void>`      | Stores value with key    |
| `remove`     | `key: string`           | `Promise<void>`      | Removes value by key     |
| `clear`      | -                       | `Promise<void>`      | Clears all stored data   |
| `getAllKeys` | -                       | `Promise<string[]>`  | Returns all storage keys |

---

## 🔧 Infrastructure Providers

### OpenAIApiProvider

Concrete implementation of `IOpenAIApiProvider`.

```typescript
@injectable()
export class OpenAIApiProvider implements IOpenAIApiProvider {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.baseUrl = 'https://api.openai.com/v1';
  }

  async sendPrompt(prompt: string): Promise<string> {
    // Implementation details...
  }
}
```

#### Configuration

```typescript
// Environment variables required
OPENAI_API_KEY=your_openai_api_key_here
EXPO_PUBLIC_API_URL=https://api.openai.com/v1
```

#### Error Handling

```typescript
try {
  const response = await openAIApiProvider.sendPrompt('Hello');
} catch (error) {
  if (error instanceof OpenAIError) {
    // Handle OpenAI specific errors
  } else {
    // Handle general errors
  }
}
```

### AudioRecorderProvider

Concrete implementation of `IAudioRecorderProvider`.

```typescript
@injectable()
export class AudioRecorderProvider implements IAudioRecorderProvider {
  private isRecordingState = false;
  private mediaRecorder?: MediaRecorder;
  private recordingStartTime = 0;

  async startRecording(): Promise<void> {
    // Implementation details...
  }
}
```

#### Permissions Required

```json
{
  "expo": {
    "plugins": [
      [
        "expo-av",
        {
          "microphonePermission": "Allow MindMate Voice to access your microphone."
        }
      ]
    ]
  }
}
```

---

## ⚙️ Services

### ChatService

Orchestrates chat functionality between voice recording and AI responses.

```typescript
@injectable()
export class ChatService {
  constructor(
    @inject('OpenAIApiProvider')
    private openAIApiProvider: IOpenAIApiProvider,
    @inject('AudioRecorderProvider')
    private audioRecorderProvider: IAudioRecorderProvider,
  ) {}

  async processVoiceMessage(): Promise<ChatMessage> {
    // Implementation details...
  }

  async sendTextMessage(message: string): Promise<ChatMessage> {
    // Implementation details...
  }
}
```

#### Methods

| Method                | Parameters        | Return Type            | Description                         |
| --------------------- | ----------------- | ---------------------- | ----------------------------------- |
| `processVoiceMessage` | -                 | `Promise<ChatMessage>` | Records voice and processes with AI |
| `sendTextMessage`     | `message: string` | `Promise<ChatMessage>` | Sends text message to AI            |

### AudioService

Handles audio processing and playback.

```typescript
@injectable()
export class AudioService {
  constructor(
    @inject('AudioRecorderProvider')
    private audioRecorderProvider: IAudioRecorderProvider,
  ) {}

  async playAudio(audioUrl: string): Promise<void> {
    // Implementation details...
  }

  async convertSpeechToText(audioFile: string): Promise<string> {
    // Implementation details...
  }
}
```

---

## 🎣 Hooks

### useAudioRecorder

Custom hook for audio recording functionality.

```typescript
const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const startRecording = useCallback(async () => {
    // Implementation details...
  }, []);

  const stopRecording = useCallback(async () => {
    // Implementation details...
  }, []);

  return {
    isRecording,
    recordingTime,
    startRecording,
    stopRecording,
  };
};
```

#### Usage

```typescript
const AudioRecorder = () => {
  const { isRecording, recordingTime, startRecording, stopRecording } = useAudioRecorder();

  return (
    <View>
      <Button onPress={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>
      {isRecording && <Text>Recording: {recordingTime}s</Text>}
    </View>
  );
};
```

### useChat

Custom hook for chat functionality.

```typescript
const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    // Implementation details...
  }, []);

  const sendVoiceMessage = useCallback(async () => {
    // Implementation details...
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    sendVoiceMessage,
  };
};
```

### useThemeApp

Custom hook for theme management.

```typescript
const useThemeApp = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeApp must be used within a ThemeProvider');
  }

  return context;
};
```

---

## 🎨 Contexts

### ThemeContext

Provides theme management across the application.

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
```

#### ThemeProvider

```typescript
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const colors = useMemo(() => getThemeColors(theme), [theme]);

  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
    colors,
  }), [theme, toggleTheme, colors]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### ChatContext

Provides chat state management.

```typescript
interface ChatContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  sendVoiceMessage: () => Promise<void>;
  clearMessages: () => void;
}
```

---

## 📊 Constants

### Colors

```typescript
export const colors = {
  // Light theme
  light: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#C6C6C8',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
  },
  // Dark theme
  dark: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    error: '#FF453A',
    success: '#30D158',
    warning: '#FF9F0A',
  },
} as const;
```

### API Endpoints

```typescript
export const API_ENDPOINTS = {
  OPENAI: {
    CHAT_COMPLETIONS: 'https://api.openai.com/v1/chat/completions',
    MODELS: 'https://api.openai.com/v1/models',
    USAGE: 'https://api.openai.com/v1/usage',
  },
} as const;
```

### Storage Keys

```typescript
export const STORAGE_KEYS = {
  THEME: 'theme',
  CHAT_HISTORY: 'chat_history',
  USER_PREFERENCES: 'user_preferences',
  API_KEY: 'api_key',
} as const;
```

---

## ⚠️ Error Handling

### Custom Error Classes

```typescript
export class OpenAIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string,
  ) {
    super(message);
    this.name = 'OpenAIError';
  }
}

export class AudioRecordingError extends Error {
  constructor(
    message: string,
    public code: string,
  ) {
    super(message);
    this.name = 'AudioRecordingError';
  }
}

export class StorageError extends Error {
  constructor(
    message: string,
    public code: string,
  ) {
    super(message);
    this.name = 'StorageError';
  }
}
```

### Error Handling Patterns

```typescript
// Service level error handling
try {
  const response = await this.openAIApiProvider.sendPrompt(prompt);
  return response;
} catch (error) {
  if (error instanceof OpenAIError) {
    throw new OpenAIError('Failed to get response from OpenAI', error.statusCode, error.code);
  }
  throw new Error('Unexpected error occurred');
}

// Component level error handling
const handleSendMessage = async (message: string) => {
  try {
    setIsLoading(true);
    await sendMessage(message);
  } catch (error) {
    if (error instanceof OpenAIError) {
      Alert.alert('API Error', error.message);
    } else {
      Alert.alert('Error', 'An unexpected error occurred');
    }
  } finally {
    setIsLoading(false);
  }
};
```

---

## 📝 Type Definitions

### ChatMessage

```typescript
interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  type: 'user' | 'assistant';
  audioUrl?: string;
  metadata?: {
    model?: string;
    tokens?: number;
    duration?: number;
  };
}
```

### ThemeColors

```typescript
interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}
```

### UsageInfo

```typescript
interface UsageInfo {
  totalUsage: number;
  dailyUsage: number;
  monthlyUsage: number;
  limit: number;
  resetDate: Date;
}
```

### AudioRecordingState

```typescript
interface AudioRecordingState {
  isRecording: boolean;
  recordingTime: number;
  audioUrl?: string;
  error?: string;
}
```

---

## 🔄 Dependency Injection Setup

### Container Configuration

```typescript
// src/shared/container/index.ts
import { container } from 'tsyringe';
import { OpenAIApiProvider } from '@/infra/providers/openai/OpenAIApiProvider';
import { AudioRecorderProvider } from '@/infra/providers/audio/AudioRecorderProvider';
import { StorageProvider } from '@/infra/providers/storage/StorageProvider';

// Register providers
container.registerSingleton('OpenAIApiProvider', OpenAIApiProvider);
container.registerSingleton('AudioRecorderProvider', AudioRecorderProvider);
container.registerSingleton('StorageProvider', StorageProvider);

// Register services
container.registerSingleton('ChatService', ChatService);
container.registerSingleton('AudioService', AudioService);
```

### Usage in Components

```typescript
import { container } from 'tsyringe';
import { ChatService } from '@/services/ChatService';

const chatService = container.resolve(ChatService);
```

---

## 📚 Additional Resources

- [Clean Architecture Guide](ARCHITECTURE.md)
- [Code Standards](CODE_STANDARDS.md)
- [Testing Guide](TESTING.md)
- [Performance Guide](PERFORMANCE.md)
- [Troubleshooting](TROUBLESHOOTING.md)

---

**Last updated:** December 2024
