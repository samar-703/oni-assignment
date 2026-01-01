/**
 * DFM Session Data Model
 * Represents a single fetal movement tracking session
 */
export interface DFMSession {
  /** Unique identifier for the session (UUID format) */
  id: string;
  /** ISO 8601 timestamp when the session was saved */
  timestamp: string;
  /** Duration of the session in seconds */
  durationSeconds: number;
}

/**
 * Navigation param list for type-safe navigation
 */
export type RootStackParamList = {
  Home: undefined;
  Counter: undefined;
};
