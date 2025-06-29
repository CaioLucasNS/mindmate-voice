# 🐛 Troubleshooting - MindMate Voice

This guide contains solutions for common problems encountered during MindMate Voice development.

## 📋 Table of Contents

- [Installation Issues](#installation-issues)
- [Build Issues](#build-issues)
- [ESLint/Prettier Issues](#eslintprettier-issues)
- [TypeScript Issues](#typescript-issues)
- [React Native Issues](#react-native-issues)
- [Performance Issues](#performance-issues)
- [Testing Issues](#testing-issues)
- [Dependency Issues](#dependency-issues)

---

## 🔧 Installation Issues

### ❌ Error: "Cannot find module"

```bash
Error: Cannot find module 'react-native'
```

#### 🔍 **Cause**

Dependencies not installed or corrupted.

#### ✅ **Solution**

```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm cache clean --force
npm install
```

### ❌ Error: "Metro bundler not found"

```bash
Error: Metro bundler not found
```

#### 🔍 **Cause**

Metro not installed or incorrectly configured.

#### ✅ **Solution**

```bash
# Install Metro explicitly
npm install --save-dev metro-react-native-babel-preset

# Verify it's in package.json
npm list metro-react-native-babel-preset
```

### ❌ Error: "Expo CLI not found"

```bash
Error: expo: command not found
```

#### 🔍 **Cause**

Expo CLI not installed globally.

#### ✅ **Solution**

```bash
# Install Expo CLI globally
npm install -g @expo/cli

# Or use npx
npx expo start
```

---

## 🏗️ Build Issues

### ❌ Error: "Build failed"

```bash
Error: Build failed with exit code 1
```

#### 🔍 **Cause**

Configuration or dependency problems.

#### ✅ **Solution**

```bash
# 1. Clear cache
npm run clean
# or
expo r -c

# 2. Check configuration
npm run lint
npm run type-check

# 3. Rebuild
npm run build
```

### ❌ Error: "TypeScript compilation failed"

```bash
Error: TypeScript compilation failed
```

#### 🔍 **Cause**

Type errors or TypeScript configuration issues.

#### ✅ **Solution**

```bash
# 1. Check type errors
npx tsc --noEmit

# 2. Fix errors automatically (if possible)
npm run lint:fix

# 3. Check tsconfig.json
cat tsconfig.json
```

### ❌ Error: "Metro bundler error"

```bash
Error: Metro bundler error: ENOSPC
```

#### 🔍 **Cause**

File watch limit exceeded (Linux).

#### ✅ **Solution**

```bash
# Increase file watch limit
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

## 🚨 ESLint/Prettier Issues

### ❌ Error: "ESLint configuration error"

```bash
Error: ESLint configuration error
```

#### 🔍 **Cause**

Incorrect ESLint configuration.

#### ✅ **Solution**

```bash
# 1. Check configuration
npx eslint --print-config .eslintrc.js

# 2. Fix problems automatically
npm run lint:fix

# 3. Verify all dependencies are installed
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### ❌ Error: "Prettier configuration error"

```bash
Error: Prettier configuration error
```

#### 🔍 **Cause**

Incorrect Prettier configuration.

#### ✅ **Solution**

```bash
# 1. Check configuration
npx prettier --check .

# 2. Format files
npm run format

# 3. Check .prettierrc
cat .prettierrc
```

### ❌ Error: "Import/export issues"

```bash
Error: Unable to resolve module
```

#### 🔍 **Cause**

Path mapping or import issues.

#### ✅ **Solution**

```bash
# 1. Check path mapping in tsconfig.json
cat tsconfig.json | grep paths

# 2. Clear Metro cache
npx react-native start --reset-cache

# 3. Check import statements
npm run lint
```

---

## 🔷 TypeScript Issues

### ❌ Error: "Type 'X' is not assignable to type 'Y'"

```bash
Type 'string' is not assignable to type 'number'
```

#### 🔍 **Cause**

Type mismatch in assignments.

#### ✅ **Solution**

```typescript
// Check type definitions
interface Props {
  count: number;
}

// Ensure correct types
const Component = ({ count }: Props) => {
  return <Text>{count.toString()}</Text>;
};
```

### ❌ Error: "Property 'X' does not exist on type 'Y'"

```bash
Property 'length' does not exist on type 'string | null'
```

#### 🔍 **Cause**

Null/undefined type issues.

#### ✅ **Solution**

```typescript
// Add null checks
const text: string | null = getText();

if (text && text.length > 0) {
  // Safe to use text.length
}

// Or use optional chaining
const length = text?.length || 0;
```

### ❌ Error: "Module has no exported member"

```bash
Module has no exported member 'ComponentName'
```

#### 🔍 **Cause**

Import/export mismatch.

#### ✅ **Solution**

```typescript
// Check export in source file
export default ComponentName;
// or
export { ComponentName };

// Use correct import
import ComponentName from './ComponentName';
// or
import { ComponentName } from './ComponentName';
```

---

## 📱 React Native Issues

### ❌ Error: "Permission denied"

```bash
Error: Permission denied for microphone
```

#### 🔍 **Cause**

Missing permissions in app configuration.

#### ✅ **Solution**

```json
// app.json
{
  "expo": {
    "android": {
      "permissions": ["android.permission.RECORD_AUDIO"]
    },
    "ios": {
      "infoPlist": {
        "NSMicrophoneUsageDescription": "This app needs microphone access"
      }
    }
  }
}
```

### ❌ Error: "Network request failed"

```bash
Error: Network request failed
```

#### 🔍 **Cause**

Network connectivity or API issues.

#### ✅ **Solution**

```typescript
// Add error handling
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
} catch (error) {
  console.error('Network error:', error);
  // Handle error appropriately
}
```

### ❌ Error: "Component not rendering"

```bash
Component not showing on screen
```

#### 🔍 **Cause**

Layout or styling issues.

#### ✅ **Solution**

```typescript
// Check component structure
const Component = () => {
  return (
    <View style={styles.container}>
      <Text>Content</Text>
    </View>
  );
};

// Verify styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

---

## ⚡ Performance Issues

### ❌ Problem: "App is slow"

```bash
App takes time to respond
```

#### 🔍 **Cause**

Performance bottlenecks in rendering or logic.

#### ✅ **Solution**

```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <View>{/* Component content */}</View>;
});

// Use useCallback for event handlers
const handlePress = useCallback(() => {
  // Handler logic
}, [dependencies]);

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

### ❌ Problem: "Memory leaks"

```bash
App memory usage increases over time
```

#### 🔍 **Cause**

Uncleaned event listeners or subscriptions.

#### ✅ **Solution**

```typescript
// Clean up in useEffect
useEffect(() => {
  const subscription = someService.subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);

// Clear timeouts
useEffect(() => {
  const timeout = setTimeout(() => {
    // Logic
  }, 1000);

  return () => clearTimeout(timeout);
}, []);
```

### ❌ Problem: "Bundle size too large"

```bash
App bundle is very large
```

#### 🔍 **Cause**

Unused dependencies or large libraries.

#### ✅ **Solution**

```bash
# Analyze bundle size
npx expo export --platform web --dump-assetmap

# Check for large dependencies
npm ls --depth=0

# Remove unused dependencies
npm uninstall unused-package
```

---

## 🧪 Testing Issues

### ❌ Error: "Tests failing"

```bash
Jest tests are failing
```

#### 🔍 **Cause**

Test configuration or mock issues.

#### ✅ **Solution**

```bash
# Run tests with verbose output
npm test -- --verbose

# Run specific test file
npm test -- ComponentName.test.tsx

# Check test configuration
cat jest.config.js
```

### ❌ Error: "Mock not working"

```bash
Mock is not being applied
```

#### 🔍 **Cause**

Incorrect mock setup.

#### ✅ **Solution**

```typescript
// Ensure mock is at the top
jest.mock('@/services/ChatService');

// Use proper mock implementation
jest.fn().mockImplementation(() => 'mocked value');

// Clear mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
```

### ❌ Error: "Coverage not generating"

```bash
Coverage report not created
```

#### 🔍 **Cause**

Coverage configuration issues.

#### ✅ **Solution**

```bash
# Generate coverage
npm run test:coverage

# Check coverage configuration
cat jest.config.js | grep coverage

# Generate HTML report
npm test -- --coverage --coverageReporters=html
```

---

## 📦 Dependency Issues

### ❌ Error: "Peer dependency warnings"

```bash
Peer dependency warnings
```

#### 🔍 **Cause**

Version conflicts between packages.

#### ✅ **Solution**

```bash
# Check for peer dependency issues
npm ls

# Install peer dependencies
npm install --save-dev peer-dependency

# Use npm-check-updates to update packages
npx npm-check-updates -u
npm install
```

### ❌ Error: "Lock file conflicts"

```bash
Lock file conflicts
```

#### 🔍 **Cause**

Conflicts between package-lock.json and yarn.lock.

#### ✅ **Solution**

```bash
# Remove lock files
rm package-lock.json
rm yarn.lock

# Clear cache
npm cache clean --force

# Reinstall dependencies
npm install
```

### ❌ Error: "Native module issues"

```bash
Native module not found
```

#### 🔍 **Cause**

Native dependencies not properly linked.

#### ✅ **Solution**

```bash
# For React Native CLI
npx react-native link

# For Expo
expo install

# Clean and rebuild
npx react-native clean
npx react-native run-android
```

---

## 🔍 Debugging Tips

### Console Debugging

```typescript
// Add debug logs
console.log('Debug info:', data);
console.warn('Warning:', message);
console.error('Error:', error);

// Use debugger statement
debugger;

// Log component props
console.log('Component props:', props);
```

### React DevTools

```bash
# Install React DevTools
npm install -g react-devtools

# Start DevTools
react-devtools
```

### Flipper Debugging

```bash
# Install Flipper
# https://fbflipper.com/

# Configure for React Native
# Add network inspection and layout debugging
```

### Performance Profiling

```bash
# Enable performance profiling
npx react-native run-android --variant=release

# Use React DevTools Profiler
# Or Flipper Performance plugin
```

---

## 📞 Getting Help

### Before Asking for Help

1. **Check this guide** - Look for similar issues
2. **Search issues** - Check GitHub issues
3. **Check documentation** - Review official docs
4. **Provide context** - Include error messages and environment

### Useful Commands

```bash
# Check environment
node --version
npm --version
npx expo --version

# Check project status
npm run lint
npm run type-check
npm test

# Clear caches
npm cache clean --force
expo r -c
npx react-native start --reset-cache
```

### Resources

- [React Native Documentation](https://reactnative.dev/docs/troubleshooting)
- [Expo Documentation](https://docs.expo.dev/troubleshooting/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint Rules](https://eslint.org/docs/rules/)

---

**Remember: Most issues can be solved by clearing caches and reinstalling dependencies! 🚀**

---

**Last updated:** December 2024
