# ⚡ Performance Guide - MindMate Voice

This document describes strategies and techniques for optimizing MindMate Voice app performance.

## 📋 Table of Contents

- [Performance Metrics](#performance-metrics)
- [Rendering Optimization](#rendering-optimization)
- [Memory Optimization](#memory-optimization)
- [Network Optimization](#network-optimization)
- [Bundle Optimization](#bundle-optimization)
- [Profiling Tools](#profiling-tools)
- [Monitoring](#monitoring)
- [Best Practices](#best-practices)

---

## 📊 Performance Metrics

### Key Metrics

- **Time to Interactive (TTI):** < 3 seconds
- **First Contentful Paint (FCP):** < 2 seconds
- **Largest Contentful Paint (LCP):** < 2.5 seconds
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Input Delay (FID):** < 100ms

### React Native Metrics

- **App Launch Time:** < 2 seconds
- **Screen Transition:** < 300ms
- **Memory Usage:** < 100MB
- **Bundle Size:** < 10MB
- **FPS:** Consistent 60 FPS

---

## 🎨 Rendering Optimization

### 1. React.memo

```typescript
// ❌ Without optimization
const ChatMessage = ({ message, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{message.content}</Text>
    </TouchableOpacity>
  );
};

// ✅ With React.memo
const ChatMessage = React.memo(({ message, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{message.content}</Text>
    </TouchableOpacity>
  );
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.message.id === nextProps.message.id;
});
```

### 2. useCallback

```typescript
// ❌ Function recreated on every render
const ChatScreen = () => {
  const handleMessagePress = (messageId) => {
    console.log('Message pressed:', messageId);
  };

  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => (
        <ChatMessage
          message={item}
          onPress={() => handleMessagePress(item.id)}
        />
      )}
    />
  );
};

// ✅ With useCallback
const ChatScreen = () => {
  const handleMessagePress = useCallback((messageId) => {
    console.log('Message pressed:', messageId);
  }, []);

  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => (
        <ChatMessage
          message={item}
          onPress={() => handleMessagePress(item.id)}
        />
      )}
    />
  );
};
```

### 3. useMemo

```typescript
// ❌ Calculation executed on every render
const ChatScreen = () => {
  const sortedMessages = messages.sort((a, b) =>
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <FlatList data={sortedMessages} />
  );
};

// ✅ With useMemo
const ChatScreen = () => {
  const sortedMessages = useMemo(() => {
    return messages.sort((a, b) =>
      new Date(b.timestamp) - new Date(a.timestamp)
    );
  }, [messages]);

  return (
    <FlatList data={sortedMessages} />
  );
};
```

### 4. Optimized FlatList

```typescript
// ✅ FlatList with optimizations
const ChatScreen = () => {
  const renderItem = useCallback(({ item }) => (
    <ChatMessage message={item} />
  ), []);

  const keyExtractor = useCallback((item) => item.id, []);

  const getItemLayout = useCallback((data, index) => ({
    length: 80, // fixed item height
    offset: 80 * index,
    index,
  }), []);

  return (
    <FlatList
      data={messages}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={10}
      updateCellsBatchingPeriod={50}
    />
  );
};
```

### 5. Virtualization

```typescript
// For very large lists
import { VirtualizedList } from 'react-native';

const ChatScreen = () => {
  const getItem = useCallback((data, index) => data[index], []);
  const getItemCount = useCallback((data) => data.length, []);

  return (
    <VirtualizedList
      data={messages}
      getItem={getItem}
      getItemCount={getItemCount}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
};
```

---

## 🧠 Memory Optimization

### 1. Event Listener Cleanup

```typescript
// ✅ Proper cleanup
const VoiceRecorder = () => {
  useEffect(() => {
    const subscription = VoiceRecorder.addListener('onSpeechResults', handleResults);

    return () => {
      subscription.remove();
    };
  }, []);
};
```

### 2. Image Optimization

```typescript
// ✅ Optimized image loading
import { Image } from 'react-native';

const OptimizedImage = ({ uri, style }) => {
  return (
    <Image
      source={{ uri }}
      style={style}
      resizeMode="cover"
      fadeDuration={300}
      progressiveRenderingEnabled={true}
      cachePolicy="memory-disk"
    />
  );
};
```

### 3. Lazy Loading

```typescript
// ✅ Lazy loading components
const LazyChatScreen = lazy(() => import('./ChatScreen'));

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyChatScreen />
    </Suspense>
  );
};
```

### 4. Memory Monitoring

```typescript
// ✅ Memory usage monitoring
import { PerformanceObserver } from 'react-native';

const monitorMemory = () => {
  const observer = new PerformanceObserver(list => {
    const entries = list.getEntries();
    entries.forEach(entry => {
      if (entry.entryType === 'memory') {
        console.log('Memory usage:', entry.usedJSHeapSize);
      }
    });
  });

  observer.observe({ entryTypes: ['memory'] });
};
```

---

## 🌐 Network Optimization

### 1. Request Caching

```typescript
// ✅ API with caching
class ChatService {
  private cache = new Map();

  async getMessages(conversationId: string) {
    const cacheKey = `messages_${conversationId}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const response = await fetch(`/api/messages/${conversationId}`);
    const data = await response.json();

    this.cache.set(cacheKey, data);
    return data;
  }
}
```

### 2. Request Debouncing

```typescript
// ✅ Debounced search
import { debounce } from 'lodash';

const SearchComponent = () => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce(searchTerm => {
      performSearch(searchTerm);
    }, 300),
    [],
  );

  const handleSearch = text => {
    setQuery(text);
    debouncedSearch(text);
  };
};
```

### 3. Request Batching

```typescript
// ✅ Batch API requests
class BatchAPI {
  private batchQueue = [];
  private batchTimeout = null;

  addToBatch(request) {
    this.batchQueue.push(request);

    if (!this.batchTimeout) {
      this.batchTimeout = setTimeout(() => {
        this.processBatch();
      }, 100);
    }
  }

  async processBatch() {
    const requests = [...this.batchQueue];
    this.batchQueue = [];
    this.batchTimeout = null;

    const batchResponse = await fetch('/api/batch', {
      method: 'POST',
      body: JSON.stringify({ requests }),
    });

    return batchResponse.json();
  }
}
```

### 4. Offline Support

```typescript
// ✅ Offline-first approach
import NetInfo from '@react-native-async-storage/async-storage';

class OfflineAPI {
  async request(endpoint, options) {
    const isConnected = await NetInfo.fetch();

    if (!isConnected) {
      return this.getFromCache(endpoint);
    }

    try {
      const response = await fetch(endpoint, options);
      await this.cacheResponse(endpoint, response);
      return response;
    } catch (error) {
      return this.getFromCache(endpoint);
    }
  }
}
```

---

## 📦 Bundle Optimization

### 1. Tree Shaking

```typescript
// ✅ Specific imports
import { useState, useEffect } from 'react';
// ❌ Avoid
import * as React from 'react';

// ✅ Specific lodash functions
import debounce from 'lodash/debounce';
// ❌ Avoid
import { debounce } from 'lodash';
```

### 2. Dynamic Imports

```typescript
// ✅ Dynamic imports for large libraries
const loadHeavyLibrary = async () => {
  const { default: HeavyLibrary } = await import('heavy-library');
  return HeavyLibrary;
};
```

### 3. Bundle Analysis

```bash
# Analyze bundle size
npx expo export --platform web --dump-assetmap

# Check for large dependencies
npm ls --depth=0

# Use webpack-bundle-analyzer
npx webpack-bundle-analyzer bundle-stats.json
```

### 4. Code Splitting

```typescript
// ✅ Code splitting by routes
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const ChatScreen = lazy(() => import('./screens/ChatScreen'));
const SettingsScreen = lazy(() => import('./screens/SettingsScreen'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Route path="/" component={HomeScreen} />
        <Route path="/chat" component={ChatScreen} />
        <Route path="/settings" component={SettingsScreen} />
      </Suspense>
    </Router>
  );
};
```

---

## 🔧 Profiling Tools

### 1. React DevTools Profiler

```typescript
// ✅ Performance profiling
import { Profiler } from 'react';

const onRenderCallback = (id, phase, actualDuration) => {
  console.log(`Component ${id} took ${actualDuration}ms to render`);
};

const ProfiledComponent = () => {
  return (
    <Profiler id="ChatMessage" onRender={onRenderCallback}>
      <ChatMessage />
    </Profiler>
  );
};
```

### 2. Flipper

```bash
# Install Flipper
# https://fbflipper.com/

# Configure plugins:
# - Network Inspector
# - Layout Inspector
# - Performance Monitor
# - Crash Reporter
```

### 3. Performance Monitor

```typescript
// ✅ Custom performance monitoring
class PerformanceMonitor {
  private metrics = new Map();

  startTimer(name) {
    this.metrics.set(name, Date.now());
  }

  endTimer(name) {
    const startTime = this.metrics.get(name);
    if (startTime) {
      const duration = Date.now() - startTime;
      console.log(`${name} took ${duration}ms`);
      this.metrics.delete(name);
    }
  }
}
```

### 4. Memory Profiler

```typescript
// ✅ Memory profiling
import { PerformanceObserver } from 'react-native';

const setupMemoryProfiler = () => {
  const observer = new PerformanceObserver(list => {
    const entries = list.getEntries();
    entries.forEach(entry => {
      if (entry.entryType === 'memory') {
        console.log('Memory:', {
          used: entry.usedJSHeapSize,
          total: entry.totalJSHeapSize,
          limit: entry.jsHeapSizeLimit,
        });
      }
    });
  });

  observer.observe({ entryTypes: ['memory'] });
};
```

---

## 📊 Monitoring

### 1. Performance Metrics

```typescript
// ✅ Track key metrics
class PerformanceTracker {
  trackAppLaunch() {
    const startTime = Date.now();

    return () => {
      const duration = Date.now() - startTime;
      this.sendMetric('app_launch_time', duration);
    };
  }

  trackScreenTransition(screenName) {
    const startTime = Date.now();

    return () => {
      const duration = Date.now() - startTime;
      this.sendMetric('screen_transition_time', duration, { screen: screenName });
    };
  }

  private sendMetric(name, value, tags = {}) {
    // Send to analytics service
    analytics.track(name, { value, ...tags });
  }
}
```

### 2. Error Tracking

```typescript
// ✅ Error monitoring
class ErrorTracker {
  trackError(error, context = {}) {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      timestamp: Date.now(),
      context,
    };

    // Send to error tracking service
    this.sendError(errorInfo);
  }

  setupGlobalErrorHandler() {
    ErrorUtils.setGlobalHandler((error, isFatal) => {
      this.trackError(error, { isFatal });
    });
  }
}
```

### 3. User Experience Metrics

```typescript
// ✅ UX metrics tracking
class UXTracker {
  trackInteraction(element, action) {
    const startTime = Date.now();

    return () => {
      const duration = Date.now() - startTime;
      this.sendMetric('interaction_time', duration, { element, action });
    };
  }

  trackScrollPerformance() {
    let lastScrollTime = Date.now();
    let scrollCount = 0;

    return event => {
      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime;

      if (timeSinceLastScroll > 16) {
        // 60 FPS threshold
        scrollCount++;
      }

      lastScrollTime = now;
    };
  }
}
```

---

## ✅ Best Practices

### 1. Component Optimization

```typescript
// ✅ Optimized component structure
const OptimizedComponent = React.memo(({ data, onPress }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true,
    }));
  }, [data]);

  const handlePress = useCallback(() => {
    onPress(processedData);
  }, [processedData, onPress]);

  return (
    <View>
      {processedData.map(item => (
        <TouchableOpacity key={item.id} onPress={handlePress}>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
});
```

### 2. State Management

```typescript
// ✅ Efficient state updates
const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = useCallback(newMessage => {
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const updateMessage = useCallback((id, updates) => {
    setMessages(prev => prev.map(msg => (msg.id === id ? { ...msg, ...updates } : msg)));
  }, []);

  const removeMessage = useCallback(id => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  }, []);
};
```

### 3. Image Loading

```typescript
// ✅ Optimized image loading
const OptimizedImage = ({ uri, style, placeholder }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <View style={style}>
      {isLoading && placeholder}
      <Image
        source={{ uri }}
        style={[style, { opacity: isLoading ? 0 : 1 }]}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        resizeMode="cover"
        fadeDuration={300}
      />
      {hasError && <ErrorPlaceholder />}
    </View>
  );
};
```

### 4. Network Requests

```typescript
// ✅ Optimized API calls
class OptimizedAPI {
  private cache = new Map();
  private pendingRequests = new Map();

  async request(endpoint, options = {}) {
    const cacheKey = `${endpoint}_${JSON.stringify(options)}`;

    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Check if request is already pending
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey);
    }

    // Make new request
    const requestPromise = fetch(endpoint, options)
      .then(response => response.json())
      .then(data => {
        this.cache.set(cacheKey, data);
        this.pendingRequests.delete(cacheKey);
        return data;
      })
      .catch(error => {
        this.pendingRequests.delete(cacheKey);
        throw error;
      });

    this.pendingRequests.set(cacheKey, requestPromise);
    return requestPromise;
  }
}
```

### 5. Memory Management

```typescript
// ✅ Proper cleanup
const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const recorderRef = useRef(null);

  useEffect(() => {
    return () => {
      if (recorderRef.current) {
        recorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const recorder = await VoiceRecorder.start();
      recorderRef.current = recorder;
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (recorderRef.current) {
      recorderRef.current.stop();
      recorderRef.current = null;
      setIsRecording(false);
    }
  }, []);
};
```

---

## 🎯 Performance Checklist

### Development Phase

- [ ] **Use React.memo for expensive components**
- [ ] **Implement useCallback for event handlers**
- [ ] **Use useMemo for expensive calculations**
- [ ] **Optimize FlatList with proper props**
- [ ] **Implement proper cleanup in useEffect**
- [ ] **Use lazy loading for large components**
- [ ] **Optimize images with proper sizing**
- [ ] **Implement request caching**
- [ ] **Use debouncing for search inputs**
- [ ] **Monitor bundle size regularly**

### Testing Phase

- [ ] **Test on low-end devices**
- [ ] **Monitor memory usage**
- [ ] **Check for memory leaks**
- [ ] **Test network performance**
- [ ] **Verify smooth animations (60 FPS)**
- [ ] **Test app launch time**
- [ ] **Check screen transition times**
- [ ] **Monitor battery usage**
- [ ] **Test offline functionality**
- [ ] **Verify error handling**

### Production Phase

- [ ] **Set up performance monitoring**
- [ ] **Track user experience metrics**
- [ ] **Monitor crash rates**
- [ ] **Track API response times**
- [ ] **Monitor memory usage in production**
- [ ] **Set up alerts for performance issues**
- [ ] **Regular performance audits**
- [ ] **Optimize based on real user data**
- [ ] **Update dependencies regularly**
- [ ] **Monitor third-party library impact**

---

## 📚 Resources

- [React Native Performance](https://reactnative.dev/docs/performance)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Flipper Documentation](https://fbflipper.com/docs/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Performance Best Practices](https://web.dev/performance/)

---

**Remember: Performance optimization is an ongoing process. Monitor, measure, and iterate! 🚀**

---

**Last updated:** December 2024
