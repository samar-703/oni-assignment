# Daily Fetal Movement (DFM) Tracker

A React Native app for tracking daily fetal movements during pregnancy.

## How to Run

```bash
npm install
npx expo start --tunnel
```

Scan the QR code with Expo Go (Android) or Camera app (iOS).

## Libraries Used

| Library                                   | Version | Purpose                    |
| ----------------------------------------- | ------- | -------------------------- |
| expo                                      | 54.0.0  | Development framework      |
| react-native                              | 0.81.5  | Core framework             |
| @react-navigation/native-stack            | 7.3.0   | Screen navigation          |
| @react-native-async-storage/async-storage | 2.2.0   | Local data persistence     |
| expo-blur                                 | 15.0.8  | Blur effect for info modal |
| react-native-safe-area-context            | 5.6.0   | Safe area handling         |
| typescript                                | 5.9.2   | Type safety                |

## Data Structure

Sessions are stored in AsyncStorage as a JSON array under the key `dfm_sessions`.

```typescript
interface DFMSession {
  id: string; // UUID (e.g., "a1b2c3d4-...")
  timestamp: string; // ISO 8601 (e.g., "2026-01-01T10:30:00.000Z")
  durationSeconds: number; // Time taken for 10 kicks (e.g., 720)
}
```

**Example stored data:**

```json
[
  {
    "id": "abc123",
    "timestamp": "2026-01-01T10:30:00.000Z",
    "durationSeconds": 720
  },
  {
    "id": "def456",
    "timestamp": "2025-12-31T09:15:00.000Z",
    "durationSeconds": 540
  }
]
```

## Assumptions

1. Each session represents the time taken to count 10 fetal kicks
2. Duration is displayed in minutes on the Home screen (e.g., "12 mins")
3. Sessions are sorted by most recent first
4. No user authentication required - single user, local storage only
5. App supports both light and dark mode based on device settings
