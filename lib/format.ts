// Display formatters. Anything that turns a raw value into something the
// user sees on screen should live here so we don't end up with three
// slightly-different price formatters scattered across the codebase.

const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/**
 * Format a price expressed in NGN. Accepts numbers and numeric strings
 * (the backend currently returns prices as strings). Returns "₦0" for
 * `NaN`, `null`, `undefined`, or unparseable input instead of throwing.
 */
export function formatNaira(value: number | string | null | undefined): string {
  const n =
    typeof value === "string" ? Number.parseFloat(value) : Number(value ?? 0);
  if (!Number.isFinite(n)) return "₦0";
  return nairaFormatter.format(n);
}

/**
 * Pad a number to two digits — handy for countdown displays.
 */
export function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}

/**
 * Format a duration (given in milliseconds) into a `HH:MM:SS` string. Caps
 * the hours field at the supplied total — no negatives, no NaN.
 */
export function formatDuration(ms: number): string {
  const safe = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
}
