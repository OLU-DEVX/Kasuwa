// Tiny logger so we have a single place to ship logs to (eventually) and
// can keep the rest of the codebase free of bare `console.*` calls — which
// the ESLint config warns on for good reason.

type Level = "debug" | "info" | "warn" | "error";

const ENABLED = process.env.NODE_ENV !== "production";

function emit(level: Level, message: string, meta?: Record<string, unknown>): void {
  if (!ENABLED && level === "debug") return;
  const payload = meta ? { msg: message, ...meta } : message;
  // eslint-disable-next-line no-console
  console[level === "debug" ? "log" : level](payload);
}

export const logger = {
  debug: (msg: string, meta?: Record<string, unknown>) => emit("debug", msg, meta),
  info: (msg: string, meta?: Record<string, unknown>) => emit("info", msg, meta),
  warn: (msg: string, meta?: Record<string, unknown>) => emit("warn", msg, meta),
  error: (msg: string, meta?: Record<string, unknown>) => emit("error", msg, meta),
};
