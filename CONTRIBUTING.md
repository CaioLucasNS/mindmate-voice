# 🤝 Contributing Guide - MindMate Voice

Thank you for considering contributing to MindMate Voice! This document provides guidelines and important information for contributions.

## 📋 Table of Contents

- [How to Contribute](#how-to-contribute)
- [Environment Setup](#environment-setup)
- [Code Standards](#code-standards)
- [Development Process](#development-process)
- [Testing](#testing)
- [Pull Requests](#pull-requests)
- [Code Review](#code-review)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)

---

## 🚀 How to Contribute

### Types of Contributions

- 🐛 **Bug Fixes:** Fix existing issues
- ✨ **Features:** New functionality
- 📚 **Documentation:** Documentation improvements
- 🧪 **Tests:** Add or improve tests
- 🔧 **Refactoring:** Improve existing code
- 🎨 **UI/UX:** Interface improvements

### Before You Start

1. **Check if there's already an issue** related to what you want to do
2. **Read the project documentation** ([README.md](README.md), [ARCHITECTURE.md](docs/ARCHITECTURE.md))
3. **Understand the Clean Architecture** implementation
4. **Familiarize yourself with the code standards** ([CODE_STANDARDS.md](docs/CODE_STANDARDS.md))

---

## ⚙️ Environment Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Git
- Expo CLI
- Code editor (VSCode recommended)

### Initial Setup

```bash
# 1. Fork the repository
# Go to https://github.com/your-username/mindmate-voice and click "Fork"

# 2. Clone your fork
git clone https://github.com/your-username/mindmate-voice.git
cd mindmate-voice

# 3. Add the original repository as upstream
git remote add upstream https://github.com/original-owner/mindmate-voice.git

# 4. Install dependencies
npm install

# 5. Configure environment variables
cp .env.example .env
# Edit the .env file with your configurations

# 6. Run the project
npm start
```

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
  "typescript.preferences.importModuleSpecifier": "relative",
  "files.associations": {
    "*.tsx": "typescriptreact"
  }
}
```

---

## 📋 Code Standards

### File Structure

```
src/
├── domain/           # Entities and contracts
├── infra/            # Concrete implementations
├── presentation/     # UI and hooks
├── services/         # Business services
└── shared/           # Shared resources
```

### Naming Conventions

| Type      | Pattern        | Example                 |
| --------- | -------------- | ----------------------- |
| Component | PascalCase     | `HomeScreen/index.tsx`  |
| Hook      | camelCase      | `useAudioRecorder.ts`   |
| Interface | I + PascalCase | `IOpenAIApiProvider.ts` |
| Constant  | camelCase      | `colors.ts`             |
| Service   | PascalCase     | `ChatService.ts`        |

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

### Component Structure

```typescript
// 1. Organized imports
import React, { useCallback } from 'react';
import { View, Text } from 'react-native';

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

## 🔄 Development Process

### 1. Creating a Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a new branch
git checkout -b feature/new-feature
# or
git checkout -b fix/bug-fix
# or
git checkout -b docs/documentation-update
```

### 2. Development

```bash
# Start development server
npm start

# Run tests
npm test

# Check code quality
npm run quality

# Fix code issues
npm run quality:fix
```

### 3. Committing Changes

```bash
# Stage changes
git add .

# Commit with conventional commit message
git commit -m "feat: add new audio recording feature"

# Push to your fork
git push origin feature/new-feature
```

### 4. Creating Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Fill out the PR template
5. Submit the PR

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --testPathPattern=ComponentName
```

### Writing Tests

```typescript
// Example test
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/presentation/components/Button';

describe('Button', () => {
  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Test" onPress={onPress} />);

    fireEvent.press(getByText('Test'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

### Test Coverage

```bash
# Generate coverage report
npm run test:coverage

# Coverage should be at least 80%
# Focus on business logic and critical components
```

---

## 🔀 Pull Requests

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Test addition

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist

- [ ] Code follows project standards
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

### PR Guidelines

1. **Keep PRs small and focused**
2. **Write clear commit messages**
3. **Include tests for new features**
4. **Update documentation if needed**
5. **Respond to review comments promptly**

---

## 👀 Code Review

### Review Process

1. **Automated checks must pass**
   - ESLint
   - Prettier
   - Tests
   - TypeScript

2. **Manual review by maintainers**
   - Code quality
   - Architecture compliance
   - Performance considerations
   - Security implications

3. **Address feedback**
   - Make requested changes
   - Respond to comments
   - Request re-review if needed

### Review Guidelines

#### For Reviewers

- Be constructive and respectful
- Focus on code quality and standards
- Consider performance and security
- Check for test coverage
- Verify documentation updates

#### For Authors

- Respond to all comments
- Make requested changes
- Ask questions if unclear
- Be open to suggestions
- Thank reviewers for their time

---

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
## Bug Description

Clear description of the issue

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Environment

- OS: [e.g. iOS 15, Android 12]
- Device: [e.g. iPhone 13, Samsung Galaxy S21]
- App Version: [e.g. 1.0.0]
- React Native Version: [e.g. 0.79.4]

## Additional Information

Screenshots, logs, etc.
```

### Before Reporting

1. **Check existing issues** - Search for similar problems
2. **Try to reproduce** - Ensure the bug is consistent
3. **Gather information** - Collect relevant details
4. **Test on different devices** - Check if it's device-specific

---

## ✨ Requesting Features

### Feature Request Template

```markdown
## Feature Description

Clear description of the requested feature

## Problem Statement

What problem does this feature solve?

## Proposed Solution

How should this feature work?

## Alternative Solutions

Other ways to solve the problem

## Additional Context

Screenshots, mockups, etc.
```

### Feature Request Guidelines

1. **Be specific** - Describe exactly what you want
2. **Explain the value** - Why is this feature needed?
3. **Consider implementation** - Is it feasible?
4. **Check existing features** - Is this already available?

---

## 🎯 Contribution Guidelines

### Code Quality

- **Follow Clean Architecture principles**
- **Use TypeScript strictly**
- **Write meaningful commit messages**
- **Add tests for new features**
- **Update documentation**

### Performance

- **Optimize React components**
- **Use proper hooks (useCallback, useMemo)**
- **Avoid unnecessary re-renders**
- **Consider bundle size**

### Security

- **Validate all inputs**
- **Sanitize data**
- **Follow security best practices**
- **Report security issues privately**

### Accessibility

- **Follow WCAG guidelines**
- **Test with screen readers**
- **Ensure keyboard navigation**
- **Use semantic HTML**

---

## 📚 Resources

### Documentation

- [Clean Architecture Guide](docs/ARCHITECTURE.md)
- [Code Standards](docs/CODE_STANDARDS.md)
- [API Documentation](docs/API.md)
- [Component Library](docs/COMPONENTS.md)

### Tools

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Community

- [GitHub Discussions](https://github.com/your-org/mindmate-voice/discussions)
- [Discord Community](https://discord.gg/your-community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/mindmate-voice)

---

## 🏆 Recognition

### Contributors

All contributors will be recognized in:

- **README.md** - Contributors section
- **Release notes** - For significant contributions
- **GitHub contributors** - Automatic recognition

### Types of Recognition

- **Code contributions** - Direct code changes
- **Documentation** - Improving docs
- **Bug reports** - Finding and reporting issues
- **Feature requests** - Suggesting improvements
- **Community support** - Helping other contributors

---

## 📞 Getting Help

### Questions and Support

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and discussions
- **Discord** - For real-time chat and support

### Before Asking

1. **Check documentation** - Look for existing answers
2. **Search issues** - See if it's already discussed
3. **Provide context** - Include relevant information
4. **Be patient** - Maintainers are volunteers

---

**Thank you for contributing to MindMate Voice! 🚀**

---

**Last updated:** December 2024
