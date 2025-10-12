// Minimal typed fetch wrapper. Adds:
//   - a base URL so callers can use relative paths
//   - a request timeout (the Render backend cold-starts and can hang)
//   - automatic retry on transient (5xx, network) errors
//   - a structured error type instead of opaque `Error` instances

import { API_URL } from "./constants";

export class ApiError extends Error {
  public readonly status: number;
  public readonly url: string;

  constructor(message: string, status: number, url: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.url = url;
  }
}

export interface ApiRequestOptions extends RequestInit {
  /** Timeout in milliseconds. Defaults to 12s. */
  timeoutMs?: number;
  /** Number of retries on transient failure. Defaults to 2. */
  retries?: number;
  /** Initial backoff in ms (doubles each retry). Defaults to 400ms. */
  retryBackoffMs?: number;
}

const DEFAULTS = {
  timeoutMs: 12_000,
  retries: 2,
  retryBackoffMs: 400,
} as const;

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

function buildUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const base = API_URL.replace(/\/+$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}

async function once<T>(url: string, options: RequestInit, timeoutMs: number): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    if (!response.ok) {
      throw new ApiError(
        `Request failed with status ${response.status}`,
        response.status,
        url
      );
    }
    return (await response.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

function isTransient(error: unknown): boolean {
  if (error instanceof ApiError) return error.status >= 500;
  // AbortError, TypeError (network), etc. — retry.
  return true;
}

export async function apiFetch<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const {
    timeoutMs = DEFAULTS.timeoutMs,
    retries = DEFAULTS.retries,
    retryBackoffMs = DEFAULTS.retryBackoffMs,
    ...init
  } = options;

  const url = buildUrl(path);
  let attempt = 0;
  let backoff = retryBackoffMs;
  let lastError: unknown;

  while (attempt <= retries) {
    try {
      return await once<T>(url, init, timeoutMs);
    } catch (error) {
      lastError = error;
      if (attempt === retries || !isTransient(error)) break;
      await sleep(backoff);
      backoff *= 2;
      attempt += 1;
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new ApiError("Unknown network error", 0, url);
}
