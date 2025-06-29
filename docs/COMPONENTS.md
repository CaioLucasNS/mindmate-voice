# 🧩 Component Library - MindMate Voice

This document provides comprehensive documentation for all reusable components in the MindMate Voice application.

## 📋 Table of Contents

- [Component Overview](#component-overview)
- [UI Components](#ui-components)
- [Audio Components](#audio-components)
- [Chat Components](#chat-components)
- [Layout Components](#layout-components)
- [Form Components](#form-components)
- [Navigation Components](#navigation-components)
- [Loading Components](#loading-components)
- [Modal Components](#modal-components)
- [Component Best Practices](#component-best-practices)

---

## 🎯 Component Overview

### Component Structure

All components follow a consistent structure:

```typescript
// 1. Imports
import React from 'react';
import { View, Text } from 'react-native';
import { useThemeApp } from '@/shared/contexts/ThemeContext';

// 2. Interface
interface ComponentProps {
  // Props definition
}

// 3. Component
const Component = ({ prop1, prop2 }: ComponentProps) => {
  // 4. Hooks
  const { colors } = useThemeApp();

  // 5. Handlers
  const handlePress = useCallback(() => {
    // Handler logic
  }, []);

  // 6. Render
  return (
    <View style={styles.container}>
      {/* Component content */}
    </View>
  );
};

// 7. Export
export default Component;
```

### Component Categories

- **UI Components:** Basic UI elements (buttons, inputs, etc.)
- **Audio Components:** Audio recording and playback
- **Chat Components:** Chat interface elements
- **Layout Components:** Layout and structure components
- **Form Components:** Form-related components
- **Navigation Components:** Navigation elements
- **Loading Components:** Loading states and indicators
- **Modal Components:** Modal dialogs and overlays

---

## 🎨 UI Components

### Button

A customizable button component with different variants and states.

```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}
```

#### Usage Examples

```typescript
// Primary button
<Button
  title="Send Message"
  onPress={handleSend}
  variant="primary"
/>

// Secondary button with icon
<Button
  title="Record Voice"
  onPress={handleRecord}
  variant="secondary"
  icon={<MicrophoneIcon />}
/>

// Disabled button
<Button
  title="Processing..."
  onPress={handlePress}
  disabled={true}
  loading={true}
/>

// Full width outline button
<Button
  title="Cancel"
  onPress={handleCancel}
  variant="outline"
  fullWidth={true}
/>
```

#### Variants

| Variant     | Description        | Use Case                  |
| ----------- | ------------------ | ------------------------- |
| `primary`   | Main action button | Primary actions, submit   |
| `secondary` | Secondary action   | Alternative actions       |
| `outline`   | Bordered button    | Cancel, secondary actions |
| `ghost`     | Minimal styling    | Subtle actions            |

### Input

A customizable text input component with validation and error states.

```typescript
interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

#### Usage Examples

```typescript
// Basic input
<Input
  value={message}
  onChangeText={setMessage}
  placeholder="Type your message..."
/>

// Input with label and error
<Input
  value={email}
  onChangeText={setEmail}
  label="Email Address"
  error={emailError}
  keyboardType="email-address"
  autoCapitalize="none"
/>

// Secure input with icons
<Input
  value={password}
  onChangeText={setPassword}
  placeholder="Enter password"
  secureTextEntry={true}
  leftIcon={<LockIcon />}
  rightIcon={<EyeIcon />}
/>

// Multiline input
<Input
  value={description}
  onChangeText={setDescription}
  placeholder="Enter description..."
  multiline={true}
  numberOfLines={4}
/>
```

### Card

A container component for grouping related content.

```typescript
interface CardProps {
  children: React.ReactNode;
  padding?: number;
  margin?: number;
  elevation?: number;
  borderRadius?: number;
  backgroundColor?: string;
  onPress?: () => void;
  disabled?: boolean;
}
```

#### Usage Examples

```typescript
// Basic card
<Card>
  <Text>Card content</Text>
</Card>

// Interactive card
<Card onPress={handlePress} elevation={4}>
  <Text>Clickable card</Text>
</Card>

// Custom styled card
<Card
  padding={16}
  margin={8}
  borderRadius={12}
  backgroundColor={colors.surface}
>
  <Text>Custom styled card</Text>
</Card>
```

---

## 🎤 Audio Components

### AudioRecorder

A component for recording audio with visual feedback.

```typescript
interface AudioRecorderProps {
  onRecordingComplete: (audioUrl: string) => void;
  onRecordingStart?: () => void;
  onRecordingStop?: () => void;
  maxDuration?: number; // in seconds
  showTimer?: boolean;
  showWaveform?: boolean;
  disabled?: boolean;
}
```

#### Usage Examples

```typescript
// Basic audio recorder
<AudioRecorder
  onRecordingComplete={handleRecordingComplete}
/>

// Audio recorder with timer and waveform
<AudioRecorder
  onRecordingComplete={handleRecordingComplete}
  onRecordingStart={handleRecordingStart}
  onRecordingStop={handleRecordingStop}
  maxDuration={60}
  showTimer={true}
  showWaveform={true}
/>

// Disabled audio recorder
<AudioRecorder
  onRecordingComplete={handleRecordingComplete}
  disabled={true}
/>
```

### AudioPlayer

A component for playing audio files with controls.

```typescript
interface AudioPlayerProps {
  audioUrl: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
  autoPlay?: boolean;
  showControls?: boolean;
  showProgress?: boolean;
  showDuration?: boolean;
}
```

#### Usage Examples

```typescript
// Basic audio player
<AudioPlayer audioUrl={audioFile} />

// Audio player with custom callbacks
<AudioPlayer
  audioUrl={audioFile}
  onPlay={handlePlay}
  onPause={handlePause}
  onEnd={handleEnd}
  onError={handleError}
  autoPlay={false}
  showControls={true}
  showProgress={true}
  showDuration={true}
/>
```

---

## 💬 Chat Components

### ChatMessage

A component for displaying individual chat messages.

```typescript
interface ChatMessageProps {
  message: ChatMessage;
  onPress?: () => void;
  onLongPress?: () => void;
  showTimestamp?: boolean;
  showAvatar?: boolean;
  showStatus?: boolean;
}
```

#### Usage Examples

```typescript
// User message
<ChatMessage
  message={userMessage}
  showTimestamp={true}
  showAvatar={true}
/>

// Assistant message with audio
<ChatMessage
  message={assistantMessage}
  onPress={handlePlayAudio}
  showTimestamp={true}
  showStatus={true}
/>
```

### ChatInput

A component for sending text and voice messages.

```typescript
interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onSendVoiceMessage: () => void;
  placeholder?: string;
  disabled?: boolean;
  showVoiceButton?: boolean;
  showSendButton?: boolean;
  multiline?: boolean;
}
```

#### Usage Examples

```typescript
// Basic chat input
<ChatInput
  onSendMessage={handleSendMessage}
  onSendVoiceMessage={handleSendVoiceMessage}
/>

// Chat input with custom placeholder
<ChatInput
  onSendMessage={handleSendMessage}
  onSendVoiceMessage={handleSendVoiceMessage}
  placeholder="Type a message or hold to record..."
  showVoiceButton={true}
  showSendButton={true}
  multiline={true}
/>
```

### ChatList

A component for displaying a list of chat messages.

```typescript
interface ChatListProps {
  messages: ChatMessage[];
  onMessagePress?: (message: ChatMessage) => void;
  onMessageLongPress?: (message: ChatMessage) => void;
  onLoadMore?: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
  inverted?: boolean;
}
```

#### Usage Examples

```typescript
// Basic chat list
<ChatList messages={messages} />

// Chat list with callbacks
<ChatList
  messages={messages}
  onMessagePress={handleMessagePress}
  onMessageLongPress={handleMessageLongPress}
  onLoadMore={handleLoadMore}
  isLoading={isLoading}
  hasMore={hasMore}
  inverted={true}
/>
```

---

## 📐 Layout Components

### Container

A wrapper component for consistent spacing and layout.

```typescript
interface ContainerProps {
  children: React.ReactNode;
  padding?: number | { top?: number; bottom?: number; left?: number; right?: number };
  margin?: number | { top?: number; bottom?: number; left?: number; right?: number };
  backgroundColor?: string;
  flex?: number;
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
}
```

#### Usage Examples

```typescript
// Basic container
<Container>
  <Text>Content</Text>
</Container>

// Container with custom spacing
<Container
  padding={16}
  margin={{ top: 8, bottom: 8 }}
  backgroundColor={colors.background}
  alignItems="center"
  justifyContent="space-between"
>
  <Text>Content</Text>
</Container>
```

### Row

A horizontal layout component.

```typescript
interface RowProps {
  children: React.ReactNode;
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  spacing?: number;
  flex?: number;
}
```

#### Usage Examples

```typescript
// Basic row
<Row>
  <Text>Left</Text>
  <Text>Right</Text>
</Row>

// Row with spacing and alignment
<Row
  alignItems="center"
  justifyContent="space-between"
  spacing={16}
>
  <Text>Left</Text>
  <Text>Right</Text>
</Row>
```

### Column

A vertical layout component.

```typescript
interface ColumnProps {
  children: React.ReactNode;
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  spacing?: number;
  flex?: number;
}
```

#### Usage Examples

```typescript
// Basic column
<Column>
  <Text>Top</Text>
  <Text>Bottom</Text>
</Column>

// Column with spacing and alignment
<Column
  alignItems="center"
  justifyContent="space-between"
  spacing={16}
>
  <Text>Top</Text>
  <Text>Bottom</Text>
</Column>
```

---

## 📝 Form Components

### FormField

A wrapper component for form inputs with validation.

```typescript
interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}
```

#### Usage Examples

```typescript
// Form field with label and error
<FormField
  label="Email Address"
  error={emailError}
  required={true}
>
  <Input
    value={email}
    onChangeText={setEmail}
    placeholder="Enter your email"
  />
</FormField>
```

### Form

A form container component with validation handling.

```typescript
interface FormProps {
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  onValidationError?: (errors: any) => void;
  initialValues?: any;
  validationSchema?: any;
}
```

#### Usage Examples

```typescript
// Basic form
<Form onSubmit={handleSubmit}>
  <FormField label="Name" required>
    <Input value={name} onChangeText={setName} />
  </FormField>
  <FormField label="Email" required>
    <Input value={email} onChangeText={setEmail} />
  </FormField>
  <Button title="Submit" onPress={handleSubmit} />
</Form>
```

---

## 🧭 Navigation Components

### Header

A customizable header component.

```typescript
interface HeaderProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  showBackButton?: boolean;
  transparent?: boolean;
}
```

#### Usage Examples

```typescript
// Basic header
<Header title="Chat" />

// Header with back button
<Header
  title="Chat"
  showBackButton={true}
  onLeftPress={handleBack}
/>

// Header with custom icons
<Header
  title="Settings"
  leftIcon={<BackIcon />}
  rightIcon={<SettingsIcon />}
  onLeftPress={handleBack}
  onRightPress={handleSettings}
/>
```

### TabBar

A custom tab bar component.

```typescript
interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
  showIcons?: boolean;
  showLabels?: boolean;
}
```

#### Usage Examples

```typescript
// Basic tab bar
<TabBar
  tabs={[
    { id: 'chat', label: 'Chat', icon: <ChatIcon /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  ]}
  activeTab={activeTab}
  onTabPress={handleTabPress}
/>
```

---

## ⏳ Loading Components

### LoadingSpinner

A customizable loading spinner component.

```typescript
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  showText?: boolean;
}
```

#### Usage Examples

```typescript
// Basic spinner
<LoadingSpinner />

// Spinner with text
<LoadingSpinner
  text="Loading..."
  showText={true}
  size="large"
  color={colors.primary}
/>
```

### LoadingOverlay

A full-screen loading overlay.

```typescript
interface LoadingOverlayProps {
  visible: boolean;
  text?: string;
  onCancel?: () => void;
  showCancelButton?: boolean;
}
```

#### Usage Examples

```typescript
// Basic overlay
<LoadingOverlay visible={isLoading} />

// Overlay with cancel button
<LoadingOverlay
  visible={isLoading}
  text="Processing your request..."
  onCancel={handleCancel}
  showCancelButton={true}
/>
```

### Skeleton

A skeleton loading component for content placeholders.

```typescript
interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  animated?: boolean;
}
```

#### Usage Examples

```typescript
// Basic skeleton
<Skeleton width={200} height={20} />

// Animated skeleton
<Skeleton
  width="100%"
  height={100}
  borderRadius={8}
  animated={true}
/>
```

---

## 🪟 Modal Components

### Modal

A customizable modal component.

```typescript
interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  closeOnBackdropPress?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
}
```

#### Usage Examples

```typescript
// Basic modal
<Modal visible={isVisible} onClose={handleClose}>
  <Text>Modal content</Text>
</Modal>

// Modal with title and close button
<Modal
  visible={isVisible}
  onClose={handleClose}
  title="Settings"
  showCloseButton={true}
  closeOnBackdropPress={true}
  animationType="slide"
>
  <Text>Modal content</Text>
</Modal>
```

### AlertDialog

A confirmation dialog component.

```typescript
interface AlertDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'info' | 'warning' | 'error' | 'success';
}
```

#### Usage Examples

```typescript
// Basic alert dialog
<AlertDialog
  visible={showAlert}
  title="Confirm Action"
  message="Are you sure you want to proceed?"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>

// Warning dialog
<AlertDialog
  visible={showWarning}
  title="Warning"
  message="This action cannot be undone."
  type="warning"
  confirmText="Delete"
  cancelText="Cancel"
  onConfirm={handleDelete}
  onCancel={handleCancel}
/>
```

---

## 🎯 Component Best Practices

### Performance Optimization

```typescript
// ✅ Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }: Props) => {
  return <View>{/* Component content */}</View>;
});

// ✅ Use useCallback for event handlers
const handlePress = useCallback(() => {
  onPress();
}, [onPress]);

// ✅ Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

### Accessibility

```typescript
// ✅ Add accessibility props
<Button
  title="Send Message"
  onPress={handleSend}
  accessible={true}
  accessibilityLabel="Send message button"
  accessibilityHint="Double tap to send your message"
/>

// ✅ Support screen readers
<Text
  accessible={true}
  accessibilityRole="header"
  accessibilityLabel="Chat title"
>
  Chat
</Text>
```

### Error Boundaries

```typescript
// ✅ Wrap components in error boundaries
<ErrorBoundary fallback={<ErrorFallback />}>
  <ChatList messages={messages} />
</ErrorBoundary>
```

### Testing

```typescript
// ✅ Add test IDs for testing
<Button
  title="Send"
  onPress={handleSend}
  testID="send-button"
/>

// ✅ Test component behavior
describe('Button', () => {
  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<Button title="Test" onPress={onPress} testID="test-button" />);

    fireEvent.press(getByTestId('test-button'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

### Documentation

````typescript
/**
 * A customizable button component with different variants and states.
 *
 * @example
 * ```tsx
 * <Button
 *   title="Send Message"
 *   onPress={handleSend}
 *   variant="primary"
 * />
 * ```
 */
interface ButtonProps {
  /** The text to display on the button */
  title: string;
  /** Function called when the button is pressed */
  onPress: () => void;
  /** The visual variant of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Whether the button is disabled */
  disabled?: boolean;
}
````

---

## 📚 Additional Resources

- [API Documentation](API.md)
- [Code Standards](CODE_STANDARDS.md)
- [Testing Guide](TESTING.md)
- [Performance Guide](PERFORMANCE.md)
- [Accessibility Guide](ACCESSIBILITY.md)

---

**Last updated:** December 2024
