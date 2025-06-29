# 🧪 Testing Guide - MindMate Voice

This document describes the testing strategy, tools, and best practices used in the MindMate Voice project.

## 📋 Table of Contents

- [Testing Strategy](#testing-strategy)
- [Tools](#tools)
- [Test Types](#test-types)
- [Test Structure](#test-structure)
- [Writing Tests](#writing-tests)
- [Mocks and Stubs](#mocks-and-stubs)
- [Test Coverage](#test-coverage)
- [CI/CD](#cicd)
- [Best Practices](#best-practices)

---

## 🎯 Testing Strategy

### Testing Pyramid

```
    🔺 E2E Tests (Few)
   🔺🔺 Integration Tests (Some)
  🔺🔺🔺 Unit Tests (Many)
```

### Objectives

- **Confidence:** Ensure code works correctly
- **Refactoring:** Enable safe changes
- **Documentation:** Tests as living documentation
- **Design:** Force good design practices
- **Debugging:** Facilitate problem identification

### Coverage Goals

- **Unit Tests:** 90%+
- **Integration Tests:** 80%+
- **E2E Tests:** 70%+

---

## 🛠️ Tools

### Jest

```json
{
  "jest": {
    "preset": "react-native",
    "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"],
    "moduleNameMapping": {
      "^@/(.*)$": "<rootDir>/src/$1"
    },
    "transformIgnorePatterns": ["node_modules/(?!(react-native|@react-native|expo|@expo)/)"],
    "collectCoverageFrom": ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!src/**/index.ts"]
  }
}
```

### React Testing Library

```bash
npm install --save-dev @testing-library/react-native @testing-library/jest-native
```

### MSW (Mock Service Worker)

```bash
npm install --save-dev msw
```

---

## 📊 Test Types

### 1. Unit Tests

Test functions and components in isolation.

```typescript
// src/tests/units/ChatService.test.ts
import { ChatService } from '@/services/chatService/ChatService';
import { IOpenAIApiProvider } from '@/domain/protocols/IOpenAIApiProvider';

describe('ChatService', () => {
  let service: ChatService;
  let mockProvider: jest.Mocked<IOpenAIApiProvider>;

  beforeEach(() => {
    mockProvider = {
      sendPrompt: jest.fn(),
      getModels: jest.fn(),
    };
    service = new ChatService(mockProvider);
  });

  describe('getResponse', () => {
    it('should return response from provider', async () => {
      // Arrange
      const prompt = 'Hello';
      const expectedResponse = 'Hello from AI';
      mockProvider.sendPrompt.mockResolvedValue(expectedResponse);

      // Act
      const result = await service.getResponse(prompt);

      // Assert
      expect(result).toBe(expectedResponse);
      expect(mockProvider.sendPrompt).toHaveBeenCalledWith(prompt);
    });

    it('should throw error for empty prompt', async () => {
      // Arrange
      const prompt = '';

      // Act & Assert
      await expect(service.getResponse(prompt)).rejects.toThrow('Prompt cannot be empty');
    });
  });
});
```

### 2. Component Tests

Test React Native components.

```typescript
// src/tests/units/HomeScreen.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '@/shared/contexts/ThemeContext';
import HomeScreen from '@/presentation/screens/HomeScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('HomeScreen', () => {
  it('should render correctly', () => {
    const { getByText } = renderWithTheme(<HomeScreen />);

    expect(getByText('MindMate Voice')).toBeTruthy();
    expect(getByText('Record')).toBeTruthy();
  });

  it('should start recording when button is pressed', async () => {
    const { getByText } = renderWithTheme(<HomeScreen />);
    const recordButton = getByText('Record');

    fireEvent.press(recordButton);

    await waitFor(() => {
      expect(getByText('Recording...')).toBeTruthy();
    });
  });

  it('should display error message when recording fails', async () => {
    // Mock permission error
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const { getByText } = renderWithTheme(<HomeScreen />);
    const recordButton = getByText('Record');

    fireEvent.press(recordButton);

    await waitFor(() => {
      expect(getByText('Error recording audio')).toBeTruthy();
    });
  });
});
```

### 3. Hook Tests

Test custom hooks.

```typescript
// src/tests/units/useChat.test.ts
import { renderHook, act } from '@testing-library/react-native';
import { useChat } from '@/presentation/hooks/useChat';

// Mock container
jest.mock('tsyringe', () => ({
  container: {
    resolve: jest.fn(),
  },
}));

describe('useChat', () => {
  let mockChatService: jest.Mocked<any>;

  beforeEach(() => {
    mockChatService = {
      getResponse: jest.fn(),
    };
    require('tsyringe').container.resolve.mockReturnValue(mockChatService);
  });

  it('should send message and update state', async () => {
    const { result } = renderHook(() => useChat());

    mockChatService.getResponse.mockResolvedValue('AI Response');

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    expect(result.current.messages).toHaveLength(2); // User + AI
    expect(result.current.messages[1].content).toBe('AI Response');
  });

  it('should handle errors gracefully', async () => {
    const { result } = renderHook(() => useChat());

    mockChatService.getResponse.mockRejectedValue(new Error('API Error'));

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    expect(result.current.messages).toHaveLength(1); // Only user message
  });
});
```

### 4. Integration Tests

Test interactions between components.

```typescript
// src/tests/integration/ChatFlow.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '@/shared/contexts/ThemeContext';
import { ChatService } from '@/services/chatService/ChatService';
import HomeScreen from '@/presentation/screens/HomeScreen';

// Mock real service
jest.mock('@/services/chatService/ChatService');

describe('Chat Flow Integration', () => {
  let mockChatService: jest.Mocked<ChatService>;

  beforeEach(() => {
    mockChatService = {
      getResponse: jest.fn(),
    } as any;
    (ChatService as jest.MockedClass<typeof ChatService>).mockImplementation(() => mockChatService);
  });

  it('should complete full chat flow', async () => {
    mockChatService.getResponse.mockResolvedValue('Hello from AI');

    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <HomeScreen />
      </ThemeProvider>
    );

    // Send text message
    const input = getByTestId('message-input');
    const sendButton = getByText('Send');

    fireEvent.changeText(input, 'Hello');
    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(getByText('Hello from AI')).toBeTruthy();
    });
  });
});
```

### 5. E2E Tests

Test complete user flows.

```typescript
// src/tests/e2e/ChatFlow.e2e.ts
import { device, element, by, expect } from 'detox';

describe('Chat Flow E2E', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should complete voice chat flow', async () => {
    // Grant microphone permission
    await device.grantPermissions('microphone');

    // Start recording
    await element(by.id('record-button')).tap();

    // Wait for recording to start
    await expect(element(by.text('Recording...'))).toBeVisible();

    // Stop recording
    await element(by.id('stop-button')).tap();

    // Wait for AI response
    await expect(element(by.text('AI Response'))).toBeVisible();
  });
});
```

---

## 📁 Test Structure

### File Organization

```
src/
├── tests/
│   ├── units/           # Unit tests
│   │   ├── services/    # Service tests
│   │   ├── components/  # Component tests
│   │   └── hooks/       # Hook tests
│   ├── integration/     # Integration tests
│   ├── e2e/            # E2E tests
│   └── mocks/          # Mock files
├── __mocks__/          # Jest mocks
└── jest.setup.js       # Jest setup
```

### Test File Naming

```
ComponentName.test.tsx    # Component tests
ServiceName.test.ts       # Service tests
hookName.test.ts          # Hook tests
FeatureName.integration.test.ts  # Integration tests
FeatureName.e2e.test.ts   # E2E tests
```

---

## ✍️ Writing Tests

### Test Structure (AAA Pattern)

```typescript
describe('Feature', () => {
  describe('method', () => {
    it('should do something when condition', () => {
      // Arrange - Setup test data and mocks
      const input = 'test';
      const expected = 'result';

      // Act - Execute the code being tested
      const result = functionUnderTest(input);

      // Assert - Verify the results
      expect(result).toBe(expected);
    });
  });
});
```

### Async Test Patterns

```typescript
// Promise-based
it('should handle async operation', async () => {
  const result = await asyncFunction();
  expect(result).toBeDefined();
});

// Callback-based
it('should handle callback', (done) => {
  asyncFunction((error, result) => {
    expect(error).toBeNull();
    expect(result).toBeDefined();
    done();
  });
});

// React Testing Library
it('should update UI after async operation', async () => {
  const { getByText } = render(<Component />);

  fireEvent.press(getByText('Load Data'));

  await waitFor(() => {
    expect(getByText('Data Loaded')).toBeVisible();
  });
});
```

### Testing Error Cases

```typescript
it('should handle errors gracefully', async () => {
  // Mock error
  mockService.mockRejectedValue(new Error('Network error'));

  // Test error handling
  await expect(asyncFunction()).rejects.toThrow('Network error');

  // Or test UI error state
  const { getByText } = render(<Component />);
  fireEvent.press(getByText('Submit'));

  await waitFor(() => {
    expect(getByText('Error occurred')).toBeVisible();
  });
});
```

---

## 🎭 Mocks and Stubs

### Jest Mocks

```typescript
// Mock modules
jest.mock('@/services/ChatService');

// Mock functions
const mockFunction = jest.fn();

// Mock implementations
jest.fn().mockImplementation(() => 'mocked value');

// Mock return values
jest.fn().mockResolvedValue('async result');
jest.fn().mockRejectedValue(new Error('error'));
```

### MSW for API Mocking

```typescript
// src/tests/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.post('/api/chat', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Hello from AI',
        timestamp: new Date().toISOString(),
      }),
    );
  }),

  rest.get('/api/models', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(['gpt-3.5-turbo', 'gpt-4']));
  }),
];

// src/tests/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

### Mocking React Native APIs

```typescript
// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock Permissions
jest.mock('expo-permissions', () => ({
  askAsync: jest.fn(),
  getAsync: jest.fn(),
}));

// Mock Audio
jest.mock('expo-av', () => ({
  Audio: {
    Recording: {
      createAsync: jest.fn(),
    },
  },
}));
```

---

## 📊 Test Coverage

### Coverage Configuration

```json
{
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{ts,tsx}",
      "!src/**/*.d.ts",
      "!src/**/index.ts",
      "!src/tests/**",
      "!src/**/*.test.{ts,tsx}"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

### Coverage Reports

```bash
# Generate coverage report
npm run test:coverage

# Generate HTML report
npm run test:coverage -- --coverageReporters=html

# Generate coverage for specific file
npm test -- --coverage --collectCoverageFrom="src/services/ChatService.ts"
```

### Coverage Analysis

```typescript
// Focus on critical paths
describe('Critical Business Logic', () => {
  it('should handle all edge cases', () => {
    // Test edge cases thoroughly
    expect(processPayment(0)).toBe('invalid');
    expect(processPayment(-1)).toBe('invalid');
    expect(processPayment(1000000)).toBe('limit-exceeded');
  });
});
```

---

## 🔄 CI/CD

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --coverage --watchAll=false

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
```

### Pre-commit Hooks

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test:staged",
      "pre-push": "npm run test:coverage"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["npm run lint", "npm run test -- --findRelatedTests"]
  }
}
```

---

## ✅ Best Practices

### Test Organization

```typescript
// Group related tests
describe('ChatService', () => {
  describe('sendMessage', () => {
    it('should send valid message', () => {});
    it('should handle empty message', () => {});
    it('should handle network error', () => {});
  });

  describe('processVoiceMessage', () => {
    it('should process audio file', () => {});
    it('should handle invalid audio', () => {});
  });
});
```

### Test Data Management

```typescript
// Use factories for test data
const createMockMessage = (overrides = {}) => ({
  id: 'test-id',
  content: 'Test message',
  timestamp: new Date(),
  type: 'user' as const,
  ...overrides,
});

// Use test utilities
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <ChatProvider>
        {component}
      </ChatProvider>
    </ThemeProvider>
  );
};
```

### Performance Testing

```typescript
// Test component performance
it('should render within performance budget', () => {
  const startTime = performance.now();

  render(<ExpensiveComponent data={largeDataset} />);

  const endTime = performance.now();
  expect(endTime - startTime).toBeLessThan(100); // 100ms budget
});

// Test memory usage
it('should not leak memory', () => {
  const initialMemory = performance.memory?.usedJSHeapSize || 0;

  for (let i = 0; i < 100; i++) {
    render(<Component />);
  }

  const finalMemory = performance.memory?.usedJSHeapSize || 0;
  expect(finalMemory - initialMemory).toBeLessThan(1000000); // 1MB limit
});
```

### Accessibility Testing

```typescript
// Test accessibility
it('should be accessible', () => {
  const { getByRole, getByLabelText } = render(<Button />);

  expect(getByRole('button')).toBeTruthy();
  expect(getByLabelText('Submit form')).toBeTruthy();
});

// Test screen reader compatibility
it('should work with screen readers', () => {
  const { getByAccessibilityHint } = render(<AudioRecorder />);

  expect(getByAccessibilityHint('Double tap to start recording')).toBeTruthy();
});
```

---

## 🚫 Anti-patterns

### What to Avoid

```typescript
// ❌ Testing implementation details
it('should call internal method', () => {
  const spy = jest.spyOn(component, 'internalMethod');
  component.render();
  expect(spy).toHaveBeenCalled();
});

// ❌ Testing multiple things in one test
it('should do everything', () => {
  // Too many assertions
  expect(result1).toBe(expected1);
  expect(result2).toBe(expected2);
  expect(result3).toBe(expected3);
  expect(result4).toBe(expected4);
});

// ❌ Not cleaning up mocks
beforeEach(() => {
  jest.spyOn(console, 'log');
});

// Missing cleanup
// afterEach(() => {
//   jest.restoreAllMocks();
// });
```

### Better Alternatives

```typescript
// ✅ Test behavior, not implementation
it('should display success message after submission', () => {
  const { getByText } = render(<Form />);
  fireEvent.press(getByText('Submit'));
  expect(getByText('Success!')).toBeVisible();
});

// ✅ Test one thing per test
it('should validate email format', () => {
  const result = validateEmail('invalid-email');
  expect(result).toBe(false);
});

it('should accept valid email', () => {
  const result = validateEmail('test@example.com');
  expect(result).toBe(true);
});

// ✅ Clean up properly
beforeEach(() => {
  jest.spyOn(console, 'log');
});

afterEach(() => {
  jest.restoreAllMocks();
});
```

---

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)
- [MSW Documentation](https://mswjs.io/docs/)
- [Detox E2E Testing](https://github.com/wix/Detox)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Remember: Good tests are like good documentation - they help you understand and maintain your code! 🚀**

---

**Last updated:** December 2024
