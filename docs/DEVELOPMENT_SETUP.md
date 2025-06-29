# ⚙️ Development Setup - MindMate Voice

This guide provides detailed instructions for setting up the MindMate Voice development environment.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Editor Configuration](#editor-configuration)
- [Git Configuration](#git-configuration)
- [Environment Variables](#environment-variables)
- [Development Scripts](#development-scripts)
- [Debugging](#debugging)
- [Recommended Tools](#recommended-tools)

---

## 🔧 Prerequisites

### Operating System

- **macOS** 10.15 or higher
- **Windows** 10 or higher
- **Linux** Ubuntu 18.04 or higher

### Required Software

#### Node.js

```bash
# Minimum version: 18.0.0
node --version
# Should return: v18.x.x or higher

# Install via nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

#### npm or yarn

```bash
# npm (comes with Node.js)
npm --version

# yarn (optional, but recommended)
npm install -g yarn
yarn --version
```

#### Git

```bash
# Minimum version: 2.20.0
git --version

# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

#### Expo CLI

```bash
# Install Expo CLI
npm install -g @expo/cli

# Verify installation
expo --version
```

### Development Tools

#### Android Studio (for Android)

```bash
# Download and install Android Studio
# https://developer.android.com/studio

# Configure environment variables
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

#### Xcode (for iOS - macOS only)

```bash
# Install via App Store
# Configure Command Line Tools
xcode-select --install
```

---

## 🚀 Installation

### 1. Clone Repository

```bash
# Fork the repository first on GitHub
# Then clone your fork
git clone https://github.com/your-username/mindmate-voice.git
cd mindmate-voice

# Add upstream
git remote add upstream https://github.com/original-owner/mindmate-voice.git
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Configure Environment Variables

```bash
# Copy example file
cp .env.example .env

# Edit .env file
nano .env
```

```env
# .env
OPENAI_API_KEY=your-api-key-here
EXPO_PUBLIC_API_URL=https://api.openai.com/v1
EXPO_PUBLIC_APP_NAME=MindMate Voice
```

### 4. Verify Installation

```bash
# Check if everything is working
npm run quality
npm test
npm start
```

---

## 📝 Editor Configuration

### VSCode (Recommended)

#### Required Extensions

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "ms-vscode.vscode-jest",
    "ms-vscode.vscode-react-native",
    "expo.vscode-expo-tools"
  ]
}
```

#### VSCode Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "files.associations": {
    "*.tsx": "typescriptreact"
  },
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "javascript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

#### Workspace Settings

```json
{
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.expo": true,
    "**/coverage": true
  },
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/node_modules": true
  }
}
```

#### Recommended Extensions

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "ms-vscode.vscode-jest",
    "ms-vscode.vscode-react-native",
    "expo.vscode-expo-tools",
    "ms-vscode.vscode-json",
    "redhat.vscode-yaml"
  ]
}
```

### Alternative Editors

#### WebStorm

```bash
# Install WebStorm
# https://www.jetbrains.com/webstorm/

# Configure ESLint and Prettier
# Settings > Languages & Frameworks > JavaScript > Code Quality Tools
```

#### Atom

```bash
# Install Atom
# https://atom.io/

# Install packages
apm install prettier-atom
apm install linter-eslint
apm install atom-typescript
```

---

## 🔧 Git Configuration

### Initial Setup

```bash
# Configure Git user
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

# Configure default branch
git config --global init.defaultBranch main

# Configure line endings
git config --global core.autocrlf input  # macOS/Linux
git config --global core.autocrlf true   # Windows
```

### Git Hooks

```bash
# Install husky for Git hooks
npm install --save-dev husky

# Configure pre-commit hook
npx husky add .husky/pre-commit "npm run quality"

# Configure commit-msg hook
npx husky add .husky/commit-msg "npx --no -- commitlint --edit \$1"
```

### Git Aliases

```bash
# Add useful aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --decorate"
```

---

## 🌍 Environment Variables

### Development Environment

```env
# .env.development
EXPO_PUBLIC_ENVIRONMENT=development
EXPO_PUBLIC_API_URL=https://api.openai.com/v1
EXPO_PUBLIC_APP_NAME=MindMate Voice (Dev)
EXPO_PUBLIC_DEBUG=true
OPENAI_API_KEY=your-development-api-key
```

### Staging Environment

```env
# .env.staging
EXPO_PUBLIC_ENVIRONMENT=staging
EXPO_PUBLIC_API_URL=https://api-staging.openai.com/v1
EXPO_PUBLIC_APP_NAME=MindMate Voice (Staging)
EXPO_PUBLIC_DEBUG=false
OPENAI_API_KEY=your-staging-api-key
```

### Environment Management

```bash
# Load specific environment
cp .env.development .env

# Or use environment-specific files
npm run start:dev    # Uses .env.development
npm run start:staging # Uses .env.staging
```

---

## 🛠️ Development Scripts

### Available Scripts

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "eslint src --ext .ts,.tsx,.js,.jsx",
    "lint:fix": "eslint src --ext .ts,.tsx,.js,.jsx --fix",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\"",
    "quality": "npm run lint && npm run format:check",
    "quality:fix": "npm run format && npm run lint:fix",
    "test": "jest",
    "test:watch": "jest --watchAll",
    "test:coverage": "jest --coverage",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf node_modules && npm install"
  }
}
```

### Custom Scripts

```bash
# Development workflow
npm run dev          # Start development server
npm run dev:android  # Start Android development
npm run dev:ios      # Start iOS development
npm run dev:web      # Start web development

# Code quality
npm run check        # Run all checks
npm run fix          # Fix all issues
npm run validate     # Validate before commit
```

---

## 🐛 Debugging

### React Native Debugging

#### Flipper (Recommended)

```bash
# Install Flipper
# https://fbflipper.com/

# Configure for React Native
# Add to your app for network inspection
```

#### React DevTools

```bash
# Install React DevTools
npm install -g react-devtools

# Start DevTools
react-devtools
```

#### Chrome DevTools

```bash
# Enable Chrome DevTools
# In your app, shake device and select "Debug JS Remotely"
# Or press Cmd+D (iOS) / Cmd+M (Android)
```

### Debugging Tools

#### Console Logging

```typescript
// Development logging
if (__DEV__) {
  console.log('Debug info:', data);
  console.warn('Warning:', message);
  console.error('Error:', error);
}
```

#### React Native Debugger

```bash
# Install React Native Debugger
# https://github.com/jhen0409/react-native-debugger

# Start debugger
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

### Performance Debugging

```bash
# Enable performance profiling
npx react-native run-android --variant=release

# Use React DevTools Profiler
# Or Flipper Performance plugin
```

---

## 🛠️ Recommended Tools

### Development Tools

#### Package Managers

- **npm** - Default Node.js package manager
- **yarn** - Faster alternative with better dependency resolution
- **pnpm** - Efficient package manager with disk space savings

#### Code Quality Tools

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Jest** - Testing framework

#### Development Servers

- **Expo CLI** - React Native development server
- **Metro** - JavaScript bundler
- **Webpack** - Module bundler (for web)

### Testing Tools

#### Unit Testing

```bash
# Jest configuration
npm test
npm run test:watch
npm run test:coverage
```

#### E2E Testing

```bash
# Detox for E2E testing
npm install -g detox-cli
detox test
```

#### Component Testing

```bash
# React Testing Library
npm run test:components
```

### Performance Tools

#### Bundle Analyzer

```bash
# Analyze bundle size
npm run analyze

# Web bundle analysis
npx expo export --platform web --dump-assetmap
```

#### Performance Monitoring

```bash
# React Native Performance
npx react-native run-android --variant=release

# Use Flipper Performance plugin
```

---

## 📱 Device Setup

### Android Devices

#### Physical Device

```bash
# Enable Developer Options
# Settings > About Phone > Tap Build Number 7 times

# Enable USB Debugging
# Settings > Developer Options > USB Debugging

# Connect device
adb devices
```

#### Android Emulator

```bash
# Create AVD (Android Virtual Device)
# Android Studio > AVD Manager > Create Virtual Device

# Start emulator
emulator -avd Pixel_4_API_30
```

### iOS Devices

#### Physical Device

```bash
# Connect device via USB
# Trust computer on device
# Open Xcode and register device
```

#### iOS Simulator

```bash
# Open Simulator
open -a Simulator

# Or via Xcode
# Xcode > Open Developer Tool > Simulator
```

### Web Development

```bash
# Start web development
npm run web

# Open browser
# http://localhost:19006
```

---

## 🔄 Development Workflow

### Daily Workflow

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install dependencies (if needed)
npm install

# 3. Start development
npm start

# 4. Make changes and test
# 5. Run quality checks
npm run quality

# 6. Commit changes
git add .
git commit -m "feat: add new feature"

# 7. Push changes
git push origin feature-branch
```

### Feature Development

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Develop feature
# 3. Test thoroughly
npm test
npm run quality

# 4. Create pull request
# 5. Code review
# 6. Merge to main
```

### Hotfix Workflow

```bash
# 1. Create hotfix branch
git checkout -b hotfix/critical-bug

# 2. Fix issue
# 3. Test fix
# 4. Create pull request
# 5. Merge to main and release
```

---

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)

---

**Last updated:** December 2024
