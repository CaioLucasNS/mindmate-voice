# 🚀 Deployment Guide - MindMate Voice

This document describes the deployment and distribution process for the MindMate Voice application across different platforms.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Build Configuration](#build-configuration)
- [Android Build](#android-build)
- [iOS Build](#ios-build)
- [Web Build](#web-build)
- [Distribution](#distribution)
- [CI/CD](#cicd)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### Required Accounts

- **Expo Account:** [expo.dev](https://expo.dev)
- **Google Play Console:** [play.google.com/console](https://play.google.com/console)
- **Apple Developer Account:** [developer.apple.com](https://developer.apple.com)
- **GitHub Account:** [github.com](https://github.com)

### Deployment Tools

```bash
# EAS CLI (Expo Application Services)
npm install -g @expo/eas-cli

# Verify installation
eas --version
```

### Initial Setup

```bash
# Login to EAS
eas login

# Configure project
eas build:configure
```

---

## ⚙️ Build Configuration

### EAS Build Configuration

```json
// eas.json
{
  "cli": {
    "version": ">= 5.9.1"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": {
        "EXPO_PUBLIC_ENVIRONMENT": "development"
      }
    },
    "preview": {
      "distribution": "internal",
      "env": {
        "EXPO_PUBLIC_ENVIRONMENT": "staging"
      }
    },
    "production": {
      "env": {
        "EXPO_PUBLIC_ENVIRONMENT": "production"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### App Configuration

```json
// app.json
{
  "expo": {
    "name": "MindMate Voice",
    "slug": "mindmate-voice",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.mindmatevoice",
      "buildNumber": "1"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.yourcompany.mindmatevoice",
      "versionCode": 1,
      "permissions": ["android.permission.RECORD_AUDIO", "android.permission.INTERNET"]
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "plugins": ["expo-av", "expo-speech"]
  }
}
```

### Environment Variables

```env
# .env.production
EXPO_PUBLIC_API_URL=https://api.openai.com/v1
EXPO_PUBLIC_APP_NAME=MindMate Voice
EXPO_PUBLIC_ENVIRONMENT=production
EXPO_PUBLIC_DEBUG=false
```

---

## 🤖 Android Build

### 1. Android Configuration

```json
// app.json - Android Section
{
  "expo": {
    "android": {
      "package": "com.yourcompany.mindmatevoice",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "permissions": [
        "android.permission.RECORD_AUDIO",
        "android.permission.INTERNET",
        "android.permission.WRITE_EXTERNAL_STORAGE"
      ],
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "mindmatevoice"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

### 2. Build Commands

```bash
# Development build
eas build --platform android --profile development

# Preview build
eas build --platform android --profile preview

# Production build
eas build --platform android --profile production
```

### 3. Local Build (Optional)

```bash
# Configure for local build
eas build --platform android --local

# Requirements for local build:
# - Docker installed
# - 8GB+ RAM available
# - Stable internet connection
```

### 4. Build Verification

```bash
# List builds
eas build:list

# Check status
eas build:view [BUILD_ID]

# Download APK/AAB
```

---

## 🍎 iOS Build

### 1. iOS Configuration

```json
// app.json - iOS Section
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.yourcompany.mindmatevoice",
      "buildNumber": "1",
      "supportsTablet": true,
      "infoPlist": {
        "NSMicrophoneUsageDescription": "This app needs access to microphone to record voice messages.",
        "NSCameraUsageDescription": "This app needs access to camera for profile pictures.",
        "NSPhotoLibraryUsageDescription": "This app needs access to photo library for profile pictures."
      },
      "entitlements": {
        "com.apple.developer.associated-domains": ["applinks:mindmatevoice.com"]
      }
    }
  }
}
```

### 2. Build Commands

```bash
# Development build
eas build --platform ios --profile development

# Preview build
eas build --platform ios --profile preview

# Production build
eas build --platform ios --profile production
```

### 3. iOS App Store Submission

```bash
# Submit to App Store
eas submit --platform ios --profile production

# Or submit manually
eas build:list
# Download .ipa file and submit via App Store Connect
```

---

## 🌐 Web Build

### 1. Web Configuration

```json
// app.json - Web Section
{
  "expo": {
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro",
      "output": "static",
      "build": {
        "babel": {
          "include": ["@expo/vector-icons"]
        }
      }
    }
  }
}
```

### 2. Build Commands

```bash
# Development build
npm run web

# Production build
expo export --platform web

# Or using EAS
eas build --platform web --profile production
```

### 3. Web Deployment

```bash
# Deploy to Vercel
npx vercel --prod

# Deploy to Netlify
npx netlify deploy --prod

# Deploy to GitHub Pages
npm run deploy:web
```

---

## 📦 Distribution

### Android Distribution

#### Google Play Store

1. **Create Release**

   ```bash
   # Generate AAB
   eas build --platform android --profile production

   # Upload to Play Console
   # Download AAB from EAS dashboard
   # Upload to Google Play Console
   ```

2. **Release Configuration**
   ```json
   {
     "releaseNotes": {
       "en-US": "Bug fixes and performance improvements"
     },
     "track": "production"
   }
   ```

#### Internal Testing

```bash
# Internal distribution
eas build --platform android --profile preview

# Share via Expo Go or internal testing
```

### iOS Distribution

#### App Store

1. **Create Release**

   ```bash
   # Generate IPA
   eas build --platform ios --profile production

   # Submit to App Store
   eas submit --platform ios
   ```

2. **TestFlight**
   ```bash
   # Upload to TestFlight
   eas submit --platform ios --latest
   ```

#### Internal Testing

```bash
# Internal distribution
eas build --platform ios --profile preview

# Share via TestFlight internal testing
```

---

## 🔄 CI/CD

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build:android
      - uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: eas build --platform android --non-interactive

  build-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build:ios
      - uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: eas build --platform ios --non-interactive
```

### Environment Variables

```bash
# GitHub Secrets
EXPO_TOKEN=your_expo_token
EAS_PROJECT_ID=your_project_id
```

---

## 📊 Monitoring

### Build Monitoring

```bash
# Monitor build status
eas build:list --limit 10

# Get build logs
eas build:view [BUILD_ID] --logs
```

### App Performance

```json
// app.json - Analytics
{
  "expo": {
    "plugins": [
      [
        "expo-analytics",
        {
          "trackingId": "GA_TRACKING_ID"
        }
      ]
    ]
  }
}
```

### Error Tracking

```typescript
// src/shared/services/ErrorTrackingService.ts
import * as Sentry from '@sentry/react-native';

export class ErrorTrackingService {
  static init() {
    Sentry.init({
      dsn: 'YOUR_SENTRY_DSN',
      environment: process.env.EXPO_PUBLIC_ENVIRONMENT,
    });
  }

  static captureException(error: Error) {
    Sentry.captureException(error);
  }
}
```

---

## 🐛 Troubleshooting

### Common Build Issues

#### Android Build Failures

```bash
# Clear cache
expo r -c

# Reset EAS build cache
eas build --platform android --clear-cache

# Check build logs
eas build:view [BUILD_ID] --logs
```

#### iOS Build Failures

```bash
# Clear derived data
rm -rf ~/Library/Developer/Xcode/DerivedData

# Reset iOS build
eas build --platform ios --clear-cache

# Check certificates
eas credentials
```

#### Web Build Issues

```bash
# Clear web cache
rm -rf .expo/web-build

# Rebuild web
expo export --platform web --clear
```

### Performance Issues

```bash
# Analyze bundle size
npx expo export --platform web --dump-assetmap

# Check for large dependencies
npm ls --depth=0
```

### Environment Issues

```bash
# Verify environment variables
eas build:configure

# Check build profiles
cat eas.json
```

---

## 📚 Additional Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Expo Deployment Guide](https://docs.expo.dev/distribution/introduction/)
- [React Native Performance](https://reactnative.dev/docs/performance)
- [App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Policies](https://play.google.com/about/developer-content-policy/)

---

**Last updated:** December 2024
