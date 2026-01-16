/**
 * Date formatting utilities
 * Centralizes date formatting logic used across the application
 */

const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
};

const SHORT_OPTIONS: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
};

/**
 * Format a date string (ISO format) to a human-readable format
 * @param dateString - ISO date string
 * @param options - Intl.DateTimeFormatOptions
 */
export function formatDate(
    dateString: string,
    options: Intl.DateTimeFormatOptions = DEFAULT_OPTIONS,
): string {
    return new Date(dateString).toLocaleDateString(undefined, options);
}

/**
 * Format a Unix timestamp (seconds) to a human-readable format
 * Used for Stripe timestamps which are in seconds
 * @param timestamp - Unix timestamp in seconds
 * @param options - Intl.DateTimeFormatOptions
 */
export function formatUnixTimestamp(
    timestamp: number,
    options: Intl.DateTimeFormatOptions = SHORT_OPTIONS,
): string {
    return new Date(timestamp * 1000).toLocaleDateString(undefined, options);
}
