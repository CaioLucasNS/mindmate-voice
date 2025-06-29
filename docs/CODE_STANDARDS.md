# 📋 Code Standards - MindMate Voice

This document describes the code standards, rules, and best practices used in the MindMate Voice project.

## 🎯 Objectives

- **Consistency:** Maintain consistent code throughout the project
- **Readability:** Code that is easy to read and understand
- **Maintainability:** Code that is easy to maintain and modify
- **Performance:** Optimizations for React Native
- **Accessibility:** Accessible and inclusive code

---

## ⚛️ React & React Native

### Components

#### ✅ **Correct**

```typescript
// Arrow function for components
const HomeScreen = () => {
  const { theme } = useThemeApp();

  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
    </View>
  );
};

export default HomeScreen;
```

#### ❌ **Incorrect**

```typescript
// Function declaration (not allowed)
function HomeScreen() {
  return <View><Text>Hello World</Text></View>;
}
```

### Hooks

#### ✅ **Correct**

```typescript
// useCallback for functions passed as props
const handlePress = useCallback(() => {
  onPress();
}, [onPress]);

// useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// useEffect with correct dependencies
useEffect(() => {
  fetchData();
}, [fetchData]);
```

#### ❌ **Incorrect**

```typescript
// Function recreated on every render
const handlePress = () => {
  onPress();
};

// Calculation executed on every render
const expensiveValue = heavyCalculation(data);

// useEffect without dependencies
useEffect(() => {
  fetchData();
}, []);
```

### Context Providers

#### ✅ **Correct**

```typescript
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
```

#### ❌ **Incorrect**

```typescript
// Object recreated on every render
<ThemeContext.Provider value={{ theme, toggleTheme }}>
  {children}
</ThemeContext.Provider>
```

---

## 🎨 Styles

### StyleSheet vs Inline Styles

#### ✅ **Correct**

```typescript
// File: styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.textPrimary,
  },
});

// Component
import { styles } from './styles';

const Component = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Hello</Text>
  </View>
);
```

#### ❌ **Incorrect**

```typescript
// Inline styles (not allowed)
const Component = () => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <Text style={{ fontSize: 16, color: '#333' }}>Hello</Text>
  </View>
);
```

### Colors

#### ✅ **Correct**

```typescript
// File: constants/colors.ts
export const colors = {
  textPrimary: '#333',
  textSecondary: '#666',
  background: '#fff',
  primary: '#007AFF',
} as const;

// Usage
import { colors } from '@/shared/constants/colors';

const styles = StyleSheet.create({
  text: {
    color: colors.textPrimary,
  },
});
```

#### ❌ **Incorrect**

```typescript
// Literal colors (not allowed)
const styles = StyleSheet.create({
  text: {
    color: '#333',
  },
});
```

---

## 📁 File Structure

### Import Organization

```typescript
// 1. React and React Native
import React from 'react';
import { View, Text } from 'react-native';

// 2. External libraries
import { Button } from 'react-native-paper';

// 3. Internal imports (path mapping)
import { useThemeApp } from '@/shared/contexts/ThemeContext';

// 4. Relative imports
import { styles } from './styles';
```

### File Naming

| Type      | Pattern        | Example                 |
| --------- | -------------- | ----------------------- |
| Component | PascalCase     | `HomeScreen/index.tsx`  |
| Hook      | camelCase      | `useAudioRecorder.ts`   |
| Interface | I + PascalCase | `IOpenAIApiProvider.ts` |
| Constant  | camelCase      | `colors.ts`             |
| Service   | PascalCase     | `ChatService.ts`        |

### Folder Structure

```
src/
├── domain/           # Entities and contracts
├── infra/            # Concrete implementations
├── presentation/     # UI and hooks
├── services/         # Business services
└── shared/           # Shared resources
```

---

## 🔧 TypeScript

### Interfaces and Types

#### ✅ **Correct**

```typescript
// Interface for component props
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

// Type for theme
type Theme = 'light' | 'dark';

// Interface for API response
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
```

#### ❌ **Incorrect**

```typescript
// Using 'any' type
const data: any = response.data;

// Inline object types
const Component = ({ title, onPress }: { title: string; onPress: () => void }) => {
  // ...
};
```

### Strict TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

---

## 🧪 Testing

### Test Structure

```typescript
// Component test
describe('Button', () => {
  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Test" onPress={onPress} />);

    fireEvent.press(getByText('Test'));
    expect(onPress).toHaveBeenCalled();
  });
});

// Service test
describe('ChatService', () => {
  it('should return response from provider', async () => {
    const mockProvider = {
      sendPrompt: jest.fn().mockResolvedValue('Hello from AI'),
    };
    const service = new ChatService(mockProvider);

    const result = await service.getResponse('Hello');
    expect(result).toBe('Hello from AI');
  });
});
```

### Test Coverage

- **Minimum:** 80% coverage
- **Target:** 90%+ coverage
- **Focus:** Business logic and critical components

---

## 📝 Documentation

### JSDoc Comments

```typescript
/**
 * Custom hook for audio recording functionality.
 *
 * @returns {Object} Audio recording state and functions
 * @returns {boolean} returns.isRecording - Current recording status
 * @returns {number} returns.recordingTime - Recording duration in seconds
 * @returns {Function} returns.startRecording - Function to start recording
 * @returns {Function} returns.stopRecording - Function to stop recording
 */
const useAudioRecorder = () => {
  // Implementation
};
```

### README Files

````markdown
# Component Name

Brief description of the component.

## Props

| Prop    | Type       | Required | Description   |
| ------- | ---------- | -------- | ------------- |
| title   | string     | Yes      | Button text   |
| onPress | () => void | Yes      | Press handler |

## Usage

```tsx
<Button title="Click me" onPress={handlePress} />
```
````

````

---

## 🚀 Performance

### React Optimization

```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }: Props) => {
  return <View>{/* Component content */}</View>;
});

// Use useCallback for event handlers
const handlePress = useCallback(() => {
  onPress();
}, [onPress]);

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
````

### Bundle Optimization

```typescript
// Lazy load components
const LazyComponent = lazy(() => import('./LazyComponent'));

// Tree shaking friendly imports
import { Button } from 'react-native-paper';
// Instead of
import * as Paper from 'react-native-paper';
```

---

## ♿ Accessibility

### Accessibility Props

```typescript
// Add accessibility props
<Button
  title="Send Message"
  onPress={handleSend}
  accessible={true}
  accessibilityLabel="Send message button"
  accessibilityHint="Double tap to send your message"
/>

// Support screen readers
<Text
  accessible={true}
  accessibilityRole="header"
  accessibilityLabel="Chat title"
>
  Chat
</Text>
```

### Color Contrast

```typescript
// Ensure sufficient color contrast
const colors = {
  // 4.5:1 contrast ratio (WCAG AA)
  textPrimary: '#1a1a1a', // Soft black
  textSecondary: '#4a4a4a', // Dark gray
  background: '#ffffff', // White
  primary: '#007AFF', // iOS blue
  secondary: '#5856D6', // Purple
  success: '#34C759', // Green
  warning: '#FF9500', // Orange
  error: '#FF3B30', // Red

  // Dark mode
  darkTextPrimary: '#ffffff', // White
  darkTextSecondary: '#8e8e93', // Light gray
  darkBackground: '#000000', // Black
  darkSurface: '#1c1c1e', // Dark surface
};
```

---

## 🔒 Security

### Input Validation

```typescript
// Validate all inputs
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize data
const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, '');
};
```

### Secure Storage

```typescript
// Use secure storage for sensitive data
import * as SecureStore from 'expo-secure-store';

const storeToken = async (token: string) => {
  await SecureStore.setItemAsync('auth_token', token);
};

const getToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync('auth_token');
};
```

---

## 📋 ESLint Rules

### React Hooks Rules

```json
{
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-no-bind": "error",
    "react/jsx-key": "error"
  }
}
```

### TypeScript Rules

```json
{
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/prefer-const": "error"
  }
}
```

### Import Rules

```json
{
  "rules": {
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"]
      }
    ]
  }
}
```

---

## 🔄 Git Workflow

### Commit Messages

```bash
# Conventional commit format
feat: add new audio recording feature
fix: resolve memory leak in audio player
docs: update API documentation
style: format code with prettier
refactor: extract audio service logic
test: add unit tests for chat service
chore: update dependencies
```

### Branch Naming

```bash
# Feature branches
feature/audio-recording
feature/chat-interface
feature/dark-theme

# Bug fix branches
fix/memory-leak
fix/crash-on-startup
fix/typo-in-message

# Documentation branches
docs/api-documentation
docs/readme-update
docs/architecture-guide
```

---

## 📊 Code Quality Metrics

### Maintainability

- **Cyclomatic Complexity:** < 10 per function
- **Lines of Code:** < 50 per function
- **Depth of Nesting:** < 4 levels
- **Function Parameters:** < 5 parameters

### Performance

- **Bundle Size:** < 2MB for initial load
- **Render Time:** < 16ms per frame
- **Memory Usage:** < 100MB for typical usage
- **Network Requests:** Minimize and cache

### Testing

- **Coverage:** > 80% overall
- **Critical Paths:** 100% coverage
- **Edge Cases:** Comprehensive testing
- **Integration Tests:** Key user flows

---

## 🎯 Best Practices Summary

### Do's

- ✅ Use arrow functions for components
- ✅ Implement useCallback and useMemo appropriately
- ✅ Use StyleSheet for styles
- ✅ Follow TypeScript strict mode
- ✅ Write comprehensive tests
- ✅ Add accessibility props
- ✅ Validate all inputs
- ✅ Use semantic naming
- ✅ Document complex logic
- ✅ Follow Clean Architecture principles

### Don'ts

- ❌ Use function declarations for components
- ❌ Create functions on every render
- ❌ Use inline styles
- ❌ Use 'any' type
- ❌ Skip writing tests
- ❌ Ignore accessibility
- ❌ Trust user input
- ❌ Use unclear variable names
- ❌ Leave code undocumented
- ❌ Mix concerns across layers

---

## 📚 Additional Resources

- [React Native Best Practices](https://reactnative.dev/docs/performance)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Clean Code Principles](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

**Remember: Clean code is not just about working code, it's about maintainable, readable, and scalable code! 🚀**

---

**Last updated:** December 2024
