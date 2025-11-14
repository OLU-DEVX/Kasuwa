import { useEffect, useState } from "react";
import { readJSON, writeJSON } from "./storage";

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isComplete: boolean;
}

function splitDuration(ms: number): CountdownParts {
  const safe = Math.max(0, ms);
  return {
    totalMs: safe,
    isComplete: safe <= 0,
    days: Math.floor(safe / (1000 * 60 * 60 * 24)),
    hours: Math.floor((safe % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((safe % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((safe % (1000 * 60)) / 1000),
  };
}

interface Options {
  /** Length of the countdown if no persisted value is found, in ms. */
  durationMs: number;
  /** Optional `localStorage` key — persists the end-time between reloads. */
  storageKey?: string;
}

/**
 * Drives a countdown clock that ticks once per second. When `storageKey`
 * is supplied the end-time is persisted so the user sees the same offer
 * across page refreshes.
 */
export function useCountdown({ durationMs, storageKey }: Options): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>(() =>
    splitDuration(durationMs)
  );

  useEffect(() => {
    let endTime = Date.now() + durationMs;
    if (storageKey) {
      const persisted = readJSON<number | null>(storageKey, null);
      if (persisted && persisted > Date.now()) {
        endTime = persisted;
      } else {
        writeJSON(storageKey, endTime);
      }
    }
    const tick = () => setParts(splitDuration(endTime - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [durationMs, storageKey]);

  return parts;
}
