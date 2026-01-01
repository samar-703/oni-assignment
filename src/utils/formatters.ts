/**
 * Formats seconds into MM:SS display format
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

/**
 * Formats seconds into human-readable duration (e.g., "5 mins 30 secs")
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (mins === 0) {
    return `${secs} sec${secs !== 1 ? "s" : ""}`;
  }
  if (secs === 0) {
    return `${mins} min${mins !== 1 ? "s" : ""}`;
  }
  return `${mins} min${mins !== 1 ? "s" : ""} ${secs} sec${
    secs !== 1 ? "s" : ""
  }`;
}

/**
 * Formats ISO timestamp into readable date string
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
