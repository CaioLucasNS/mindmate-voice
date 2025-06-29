# 🏗️ Architecture - MindMate Voice

This document describes the architecture of the MindMate Voice project, based on Clean Architecture principles.

## 🎯 Clean Architecture Principles

### 1. **Framework Independence**

- Business code does not depend on external frameworks
- Frameworks are implementation details

### 2. **Testability**

- Business rules can be tested without UI, database, or any external element

### 3. **UI Independence**

- The user interface can be easily changed without altering the rest of the system

### 4. **Database Independence**

- Business rules are not tied to the database

### 5. **External Agency Independence**

- Business rules know nothing about the outside world

---

## 📁 Layer Structure

```
src/
├── domain/           # 🎯 Domain Layer (Most Inner)
├── infra/            # 🔧 Infrastructure Layer (Most Outer)
├── presentation/     # 🎨 Presentation Layer
├── services/         # ⚙️ Services Layer
└── shared/           # 🔄 Shared Resources
```

### Dependency Flow

```
Presentation → Services → Domain ← Infrastructure
     ↓              ↓         ↑           ↑
     └──────────────┴─────────┴───────────┘
```

**Rule:** Dependencies only point inward (Domain)

---

## 🎯 Domain Layer

### Responsibilities

- **Entities:** Main business objects
- **Use Cases:** Specific business rules
- **Interfaces:** Contracts for external implementations

### Structure

```
src/domain/
├── entities/         # Business entities
├── useCases/         # Use cases
└── protocols/        # Interfaces and contracts
```

### Example: Provider Interface

```typescript
// src/domain/protocols/IOpenAIApiProvider.ts
export interface IOpenAIApiProvider {
  sendPrompt(prompt: string): Promise<string>;
  getModels(): Promise<string[]>;
}

// src/domain/protocols/IAudioRecorderProvider.ts
export interface IAudioRecorderProvider {
  startRecording(): Promise<void>;
  stopRecording(): Promise<string>;
  isRecording(): boolean;
}
```

### Example: Entity

```typescript
// src/domain/entities/ChatMessage.ts
export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  type: 'user' | 'assistant';
  audioUrl?: string;
}

export class ChatMessageEntity {
  constructor(
    public readonly id: string,
    public readonly content: string,
    public readonly timestamp: Date,
    public readonly type: 'user' | 'assistant',
    public readonly audioUrl?: string,
  ) {}

  static create(content: string, type: 'user' | 'assistant'): ChatMessageEntity {
    return new ChatMessageEntity(crypto.randomUUID(), content, new Date(), type);
  }
}
```

---

## 🔧 Infrastructure Layer

### Responsibilities

- **Concrete Implementations:** Of Domain interfaces
- **External Integrations:** APIs, databases, services
- **Technical Details:** Configurations, adapters

### Structure

```
src/infra/
├── providers/        # Provider implementations
│   ├── openai/       # OpenAI API
│   ├── audio/        # Audio recording
│   └── storage/      # Local storage
├── config/           # Configurations
└── adapters/         # Adapters
```

### Example: OpenAI Provider

```typescript
// src/infra/providers/openai/OpenAIApiProvider.ts
import { injectable } from 'tsyringe';
import { IOpenAIApiProvider } from '@/domain/protocols/IOpenAIApiProvider';

@injectable()
export class OpenAIApiProvider implements IOpenAIApiProvider {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.baseUrl = 'https://api.openai.com/v1';
  }

  async sendPrompt(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      throw new Error(`Failed to send prompt: ${error}`);
    }
  }

  async getModels(): Promise<string[]> {
    // Implementation to fetch available models
    return ['gpt-3.5-turbo', 'gpt-4'];
  }
}
```

### Example: Audio Provider

```typescript
// src/infra/providers/audio/AudioRecorderProvider.ts
import { injectable } from 'tsyringe';
import { IAudioRecorderProvider } from '@/domain/protocols/IAudioRecorderProvider';

@injectable()
export class AudioRecorderProvider implements IAudioRecorderProvider {
  private isRecordingState = false;
  private mediaRecorder?: MediaRecorder;

  async startRecording(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.isRecordingState = true;

      this.mediaRecorder.start();
    } catch (error) {
      throw new Error(`Failed to start recording: ${error}`);
    }
  }

  async stopRecording(): Promise<string> {
    if (!this.mediaRecorder) {
      throw new Error('No active recording');
    }

    return new Promise((resolve, reject) => {
      this.mediaRecorder!.onstop = () => {
        const audioBlob = new Blob([this.mediaRecorder!.data], { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        this.isRecordingState = false;
        resolve(audioUrl);
      };

      this.mediaRecorder!.onerror = error => {
        reject(new Error(`Recording error: ${error}`));
      };

      this.mediaRecorder!.stop();
    });
  }

  isRecording(): boolean {
    return this.isRecordingState;
  }
}
```

---

## 🎨 Presentation Layer

### Responsibilities

- **UI Components:** React Native components
- **Hooks:** Custom React hooks
- **Screens:** Application screens
- **Navigation:** App navigation logic

### Structure

```
src/presentation/
├── components/       # Reusable components
├── screens/          # Application screens
├── hooks/            # Custom hooks
├── themes/           # Themes and styles
└── contexts/         # React contexts
```

### Example: Screen Component

```typescript
// src/presentation/screens/HomeScreen/index.tsx
import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { useThemeApp } from '@/shared/contexts/ThemeContext';
import { AudioRecorder } from '@/presentation/components/AudioRecorder';
import { ChatList } from '@/presentation/components/ChatList';
import { useChat } from '@/presentation/hooks/useChat';

const HomeScreen = () => {
  const { colors } = useThemeApp();
  const { messages, sendVoiceMessage, isLoading } = useChat();

  const handleRecordingComplete = useCallback((audioUrl: string) => {
    sendVoiceMessage(audioUrl);
  }, [sendVoiceMessage]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        MindMate Voice
      </Text>

      <ChatList messages={messages} />

      <AudioRecorder
        onRecordingComplete={handleRecordingComplete}
        disabled={isLoading}
      />
    </View>
  );
};

export default HomeScreen;
```

### Example: Custom Hook

```typescript
// src/presentation/hooks/useChat.ts
import { useState, useCallback } from 'react';
import { container } from 'tsyringe';
import { ChatService } from '@/services/ChatService';
import { ChatMessage } from '@/domain/entities/ChatMessage';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatService = container.resolve(ChatService);

  const sendMessage = useCallback(
    async (content: string) => {
      setIsLoading(true);
      try {
        const message = await chatService.sendTextMessage(content);
        setMessages(prev => [...prev, message]);
      } catch (error) {
        console.error('Failed to send message:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [chatService],
  );

  const sendVoiceMessage = useCallback(
    async (audioUrl: string) => {
      setIsLoading(true);
      try {
        const message = await chatService.processVoiceMessage(audioUrl);
        setMessages(prev => [...prev, message]);
      } catch (error) {
        console.error('Failed to process voice message:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [chatService],
  );

  return {
    messages,
    isLoading,
    sendMessage,
    sendVoiceMessage,
  };
};
```

---

## ⚙️ Services Layer

### Responsibilities

- **Business Orchestration:** Coordinate use cases
- **Data Transformation:** Transform data between layers
- **Business Logic:** Complex business operations

### Structure

```
src/services/
├── chatService/      # Chat business logic
├── audioService/     # Audio processing
└── authService/      # Authentication
```

### Example: Chat Service

```typescript
// src/services/chatService/ChatService.ts
import { injectable, inject } from 'tsyringe';
import { IOpenAIApiProvider } from '@/domain/protocols/IOpenAIApiProvider';
import { IAudioRecorderProvider } from '@/domain/protocols/IAudioRecorderProvider';
import { ChatMessage, ChatMessageEntity } from '@/domain/entities/ChatMessage';

@injectable()
export class ChatService {
  constructor(
    @inject('OpenAIApiProvider')
    private openAIApiProvider: IOpenAIApiProvider,
    @inject('AudioRecorderProvider')
    private audioRecorderProvider: IAudioRecorderProvider,
  ) {}

  async sendTextMessage(content: string): Promise<ChatMessage> {
    // Create user message
    const userMessage = ChatMessageEntity.create(content, 'user');

    // Get AI response
    const aiResponse = await this.openAIApiProvider.sendPrompt(content);
    const assistantMessage = ChatMessageEntity.create(aiResponse, 'assistant');

    return assistantMessage;
  }

  async processVoiceMessage(audioUrl: string): Promise<ChatMessage> {
    // Convert audio to text (simplified)
    const textContent = await this.convertAudioToText(audioUrl);

    // Process with AI
    const aiResponse = await this.openAIApiProvider.sendPrompt(textContent);
    const assistantMessage = ChatMessageEntity.create(aiResponse, 'assistant');

    return assistantMessage;
  }

  private async convertAudioToText(audioUrl: string): Promise<string> {
    // Implementation for speech-to-text conversion
    // This would integrate with a speech recognition service
    return 'Converted audio text';
  }
}
```

---

## 🔄 Shared Resources

### Responsibilities

- **Constants:** Application constants
- **Contexts:** Global React contexts
- **Container:** Dependency injection setup
- **Utils:** Shared utilities

### Structure

```
src/shared/
├── constants/        # Application constants
├── contexts/         # Global contexts
├── container/        # Dependency injection
└── utils/            # Shared utilities
```

### Example: Theme Context

```typescript
// src/shared/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { colors } from '@/shared/constants/colors';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  colors: typeof colors.light;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const themeColors = useMemo(() => {
    return theme === 'light' ? colors.light : colors.dark;
  }, [theme]);

  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
    colors: themeColors,
  }), [theme, toggleTheme, themeColors]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeApp = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeApp must be used within a ThemeProvider');
  }
  return context;
};
```

### Example: Dependency Container

```typescript
// src/shared/container/index.ts
import { container } from 'tsyringe';
import { OpenAIApiProvider } from '@/infra/providers/openai/OpenAIApiProvider';
import { AudioRecorderProvider } from '@/infra/providers/audio/AudioRecorderProvider';
import { ChatService } from '@/services/chatService/ChatService';

// Register providers
container.registerSingleton('OpenAIApiProvider', OpenAIApiProvider);
container.registerSingleton('AudioRecorderProvider', AudioRecorderProvider);

// Register services
container.registerSingleton('ChatService', ChatService);

export { container };
```

---

## 🔄 Data Flow

### Request Flow

```
1. User Action (UI) → Presentation Layer
2. Presentation Layer → Services Layer
3. Services Layer → Domain Layer (Business Rules)
4. Services Layer → Infrastructure Layer (External APIs)
5. Infrastructure Layer → External Services
6. Response flows back through the layers
```

### Example: Voice Message Flow

```typescript
// 1. User starts recording (Presentation)
const handleStartRecording = () => {
  audioRecorder.startRecording();
};

// 2. Recording completes (Infrastructure)
const handleRecordingComplete = async (audioUrl: string) => {
  // 3. Service processes the audio
  const message = await chatService.processVoiceMessage(audioUrl);

  // 4. UI updates with the response
  setMessages(prev => [...prev, message]);
};
```

---

## 🧪 Testability

### Unit Testing

```typescript
// Testing business logic without external dependencies
describe('ChatService', () => {
  let service: ChatService;
  let mockOpenAIProvider: jest.Mocked<IOpenAIApiProvider>;
  let mockAudioProvider: jest.Mocked<IAudioRecorderProvider>;

  beforeEach(() => {
    mockOpenAIProvider = {
      sendPrompt: jest.fn(),
      getModels: jest.fn(),
    };
    mockAudioProvider = {
      startRecording: jest.fn(),
      stopRecording: jest.fn(),
      isRecording: jest.fn(),
    };

    service = new ChatService(mockOpenAIProvider, mockAudioProvider);
  });

  it('should send text message and return AI response', async () => {
    const expectedResponse = 'Hello from AI';
    mockOpenAIProvider.sendPrompt.mockResolvedValue(expectedResponse);

    const result = await service.sendTextMessage('Hello');

    expect(result.content).toBe(expectedResponse);
    expect(result.type).toBe('assistant');
  });
});
```

### Integration Testing

```typescript
// Testing with real dependencies
describe('ChatService Integration', () => {
  it('should process voice message end-to-end', async () => {
    const service = container.resolve(ChatService);

    const message = await service.processVoiceMessage('test-audio.wav');

    expect(message).toBeDefined();
    expect(message.type).toBe('assistant');
  });
});
```

---

## 🔧 Dependency Configuration

### Container Setup

```typescript
// src/shared/container/index.ts
import 'reflect-metadata';
import { container } from 'tsyringe';

// Register all dependencies
container.registerSingleton('OpenAIApiProvider', OpenAIApiProvider);
container.registerSingleton('AudioRecorderProvider', AudioRecorderProvider);
container.registerSingleton('ChatService', ChatService);

// Environment-specific registrations
if (__DEV__) {
  container.registerSingleton('Logger', DevLogger);
} else {
  container.registerSingleton('Logger', ProdLogger);
}
```

### Path Mapping

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/domain/*": ["src/domain/*"],
      "@/infra/*": ["src/infra/*"],
      "@/presentation/*": ["src/presentation/*"],
      "@/services/*": ["src/services/*"],
      "@/shared/*": ["src/shared/*"]
    }
  }
}
```

---

## 📊 Benefits

### Maintainability

- **Clear Separation:** Each layer has a specific responsibility
- **Easy to Modify:** Changes in one layer don't affect others
- **Scalable:** Easy to add new features or modify existing ones

### Testability

- **Unit Tests:** Business logic can be tested in isolation
- **Mock Dependencies:** External dependencies can be easily mocked
- **Fast Tests:** No need for UI or database setup

### Flexibility

- **Framework Independent:** Business logic doesn't depend on React Native
- **Database Independent:** Can easily switch databases
- **API Independent:** Can easily switch external APIs

### Team Collaboration

- **Clear Structure:** New developers can quickly understand the codebase
- **Parallel Development:** Teams can work on different layers simultaneously
- **Code Reviews:** Easier to review code with clear boundaries

---

## ⚠️ Considerations

### Complexity

- **Learning Curve:** Clean Architecture has a steeper learning curve
- **Boilerplate:** More files and structure required
- **Overhead:** Initial setup is more complex

### Performance

- **Abstraction Layers:** Multiple layers can impact performance
- **Memory Usage:** Dependency injection container uses memory
- **Bundle Size:** More files can increase bundle size

### Maintenance

- **File Organization:** Need to maintain proper file structure
- **Dependency Management:** Need to manage dependencies carefully
- **Documentation:** Need to document architecture decisions

---

## 🛠️ Recommended Tools

### Development

- **TypeScript:** For type safety and better IDE support
- **ESLint:** For code quality and consistency
- **Prettier:** For code formatting
- **Jest:** For testing

### Architecture

- **tsyringe:** For dependency injection
- **reflect-metadata:** For decorators support
- **path mapping:** For clean imports

### Monitoring

- **Sentry:** For error tracking
- **Flipper:** For debugging
- **React DevTools:** For component debugging

---

## 📚 Additional Resources

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Dependency Injection with tsyringe](https://github.com/microsoft/tsyringe)
- [React Native Architecture](https://reactnative.dev/docs/architecture-overview)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Remember: Clean Architecture is about making your code more maintainable, testable, and flexible! 🚀**

---

**Last updated:** December 2024
