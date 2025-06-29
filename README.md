# 🧠 MindMate Voice

### PT-BR

Aplicativo mobile em React Native com reconhecimento de voz e integração com IA (OpenAI API), construído seguindo princípios de Clean Architecture e Clean Code.

### EN-US

Mobile app built with React Native featuring voice recognition and AI integration (OpenAI API), built following Clean Architecture and Clean Code principles.

---

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator or Android Emulator

### Installation

```bash
# Clone the repository
git clone <https://github.com/CaioLucasNS/mindmate-voice.git>
cd mindmate-voice

# Install dependencies
npm install

# Start the development server
npm start
```

### Environment Setup

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
EXPO_PUBLIC_API_URL=https://api.openai.com/v1
```

---

## 📦 Main Technologies

- **React Native** `0.79.4`
- **TypeScript**
- **Expo**
- **OpenAI API**
- **tsyringe** (Dependency Injection)
- **Clean Architecture**
- **Jest** (Unit testing)
- **ESLint + Prettier** (Code formatting and quality rules)

---

## 📁 Folder Structure (Clean Architecture)

```bash
mindmate-voice/
├── src/
│   ├── domain/              # Entities and contracts
│   │   └── protocols/       # Interfaces and contracts
│   ├── infra/               # Concrete implementations
│   │   └── providers/       # Service providers
│   ├── presentation/        # UI and hooks
│   │   ├── components/      # Reusable components
│   │   ├── screens/         # Application screens
│   │   ├── hooks/           # Custom hooks
│   │   ├── themes/          # Themes and styles
│   │   └── contexts/        # React contexts
│   ├── services/            # Business services
│   ├── shared/              # Shared resources
│   │   ├── constants/       # Constants
│   │   ├── contexts/        # Global contexts
│   │   └── container/       # Dependency injection
│   └── tests/               # Unit tests
├── __mocks__/               # Test mocks
├── __tests__/               # Integration tests
└── main.tsx                 # Entry point
```

---

## 🎯 Core Features

### Voice Recognition

- Real-time audio recording
- Speech-to-text conversion
- Audio playback capabilities

### AI Integration

- OpenAI GPT integration
- Context-aware conversations
- Response generation

### Clean Architecture

- Separation of concerns
- Dependency injection
- Testable code structure

---

## 🏗️ Architecture Overview

### Clean Architecture Layers

#### **Domain Layer** (Core Business Logic)

- **Location:** `src/domain/`
- **Purpose:** Business rules and entities
- **Example:** `IOpenAIApiProvider` - Interface for API provider

#### **Infrastructure Layer** (External Dependencies)

- **Location:** `src/infra/`
- **Purpose:** Concrete implementations and external integrations
- **Example:** `OpenAIApiProvider` - OpenAI API implementation

#### **Presentation Layer** (UI Components)

- **Location:** `src/presentation/`
- **Purpose:** UI, components, and hooks
- **Example:** `HomeScreen`, `AudioRecorder`, `ThemeContext`

#### **Services Layer** (Business Orchestration)

- **Location:** `src/services/`
- **Purpose:** Use case orchestration
- **Example:** `ChatService` - Chat orchestration service

### Dependency Injection

The project uses **tsyringe** for dependency injection:

```typescript
// Example usage
@injectable()
export class ChatService {
  constructor(
    @inject('OpenAIApiProvider')
    private openAIApiProvider: IOpenAIApiProvider,
  ) {}
}
```

---

## 📋 Code Standards

### ESLint Configuration

The project uses a rigorous ESLint configuration with:

- **Performance Rules:** React Hooks optimization rules
- **Clean Architecture Rules:** Import organization by layers
- **React Native Rules:** React Native specific rules
- **Accessibility Rules:** Accessibility guidelines
- **TypeScript Rules:** Strict TypeScript rules

### Prettier Configuration

Automatic formatting with optimized settings for:

- React Native
- TypeScript
- Clean Architecture
- Performance

### Naming Conventions

```typescript
// Components
const HomeScreen = () => { ... }           // PascalCase
const AudioRecorder = () => { ... }        // PascalCase

// Hooks
const useAudioRecorder = () => { ... }     // camelCase with 'use'
const useThemeApp = () => { ... }          // camelCase with 'use'

// Interfaces
interface IOpenAIApiProvider { ... }       // 'I' + PascalCase
interface ThemeContextType { ... }         // PascalCase + 'Type'

// Constants
export const colors = { ... }              // camelCase
export const API_ENDPOINTS = { ... }       // UPPER_SNAKE_CASE

// Files
HomeScreen/index.tsx                       // PascalCase
useAudioRecorder.ts                        // camelCase
IOpenAIApiProvider.ts                      // 'I' + PascalCase
```

### Component Structure

```typescript
// 1. Organized imports
import React from 'react';
import { View, Text } from 'react-native';
import { useThemeApp } from '@/shared/contexts/ThemeContext';

// 2. Component interface
interface ComponentProps {
  title: string;
  onPress: () => void;
}

// 3. Component as arrow function
const Component = ({ title, onPress }: ComponentProps) => {
  // 4. Hooks at the top
  const { theme } = useThemeApp();

  // 5. Helper functions
  const handlePress = useCallback(() => {
    onPress();
  }, [onPress]);

  // 6. Render
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

// 7. Export
export default Component;
```

---

## 🧪 Testing

### Test Structure

```bash
src/tests/units/          # Unit tests
__tests__/                # Integration tests
__mocks__/                # Global mocks
```

### Test Example

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { ChatService } from '@/services/chatService/ChatService';

describe('ChatService', () => {
  it('should return response from OpenAI', async () => {
    // Arrange
    const service = new ChatService(mockProvider);

    // Act
    const result = await service.getResponse('Hello');

    // Assert
    expect(result).toBeDefined();
  });
});
```

### Available Test Scripts

```bash
npm test              # Run tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

---

## 🔧 Development Setup

### VSCode Recommended Extensions

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "ms-vscode.vscode-jest"
  ]
}
```

### VSCode Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

---

## 📚 Available Scripts

```bash
# Development
npm start              # Start development server
npm run android        # Run on Android
npm run ios           # Run on iOS
npm run web           # Run in browser

# Code Quality
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint issues
npm run lint:check    # Check without fixing
npm run format        # Format code with Prettier
npm run format:check  # Check formatting
npm run quality       # Run lint + format check
npm run quality:fix   # Fix lint + format

# Testing
npm test              # Run tests
npm run test:watch    # Run tests in watch mode
```

---

## 🐛 Troubleshooting

### Common Issues

#### ESLint doesn't recognize `@/` imports

```bash
# Check if tsconfig.json is configured
# Verify path mapping in tsconfig.json
```

#### Prettier doesn't format files

```bash
# Check if file is being ignored
npm run format:check
```

#### TypeScript errors

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm run lint:fix
```

#### Expo build issues

```bash
# Clear Expo cache
expo r -c
# or
npm start -- --clear
```

#### Metro bundler issues

```bash
# Clear Metro cache
npx react-native start --reset-cache
```

---

## 📖 Documentation

- **[Architecture Guide](docs/ARCHITECTURE.md)** - Detailed Clean Architecture explanation
- **[Code Standards](docs/CODE_STANDARDS.md)** - Coding conventions and best practices
- **[Development Setup](docs/DEVELOPMENT_SETUP.md)** - Complete development environment setup
- **[Testing Guide](docs/TESTING.md)** - Testing strategies and examples
- **[Performance Guide](docs/PERFORMANCE.md)** - React Native performance optimizations
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Build and deployment instructions
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues and solutions
- **[Accessibility Guide](docs/ACCESSIBILITY.md)** - Accessibility guidelines
- **[Security Guide](docs/SECURITY.md)** - Security best practices

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before contributing.

### Before Contributing

1. **Fork the repository**
2. **Create a branch:** `git checkout -b feature/new-feature`
3. **Follow the standards:**
   - Use arrow functions for components
   - Implement useCallback/useMemo when necessary
   - Avoid inline styles
   - Use constants for colors
   - Follow Clean Architecture structure

### Commit Process

```bash
# Check code quality
npm run quality

# Make commit
git add .
git commit -m "feat: add new recording functionality"

# Push
git push origin feature/new-feature
```

### Commit Conventions

```
feat: new feature
fix: bug fix
docs: documentation
style: code formatting
refactor: refactoring
test: tests
chore: build/configuration tasks
```
