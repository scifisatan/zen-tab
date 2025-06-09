/**
 * Normalizes a domain URL by ensuring it has the proper protocol and trailing slash
 * @param domain - The domain URL to normalize
 * @returns The normalized domain URL with https:// protocol and trailing slash
 */
export function normalizeDomain(domain: string): string {
  let normalizedDomain = domain;

  if (!normalizedDomain.startsWith("https://")) {
    normalizedDomain = `https://${normalizedDomain}`;
  }

  if (!normalizedDomain.endsWith("/")) {
    normalizedDomain += "/";
  }

  return normalizedDomain;
}

/**
 * Sanitizes a URL by ensuring it has the proper protocol
 * @param url - The URL to sanitize
 * @returns The sanitized URL with https:// protocol if no protocol is present
 */
export function sanitizeUrl(url: string): string {
  if (!url) return url;

  // Trim whitespace
  let sanitizedUrl = url.trim();

  // If it doesn't start with http:// or https://, add https://
  if (
    !sanitizedUrl.startsWith("http://") &&
    !sanitizedUrl.startsWith("https://")
  ) {
    sanitizedUrl = `https://${sanitizedUrl}`;
  }

  return sanitizedUrl;
}

/**
 * Validates if a URL is properly formatted
 * @param url - The URL to validate
 * @returns boolean indicating if the URL is valid
 */
export function isValidUrl(url: string): boolean {
  if (!url) return false;

  try {
    const sanitizedUrl = sanitizeUrl(url);
    new URL(sanitizedUrl);
    return true;
  } catch {
    return false;
  }
}
