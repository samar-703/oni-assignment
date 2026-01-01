import AsyncStorage from "@react-native-async-storage/async-storage";
import { DFMSession } from "../types";

const STORAGE_KEY = "dfm_sessions";

/**
 * Retrieves all saved DFM sessions from local storage
 * Returns sessions sorted by most recent first
 */
export async function getSessions(): Promise<DFMSession[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const sessions: DFMSession[] = JSON.parse(data);
    return sessions.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch {
    return [];
  }
}

/**
 * Saves a new DFM session to local storage
 * Appends to existing sessions and persists
 */
export async function saveSession(session: DFMSession): Promise<void> {
  const existing = await getSessions();
  const updated = [session, ...existing];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

/**
 * Generates a unique ID for a session
 * Uses timestamp + random string for uniqueness
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
