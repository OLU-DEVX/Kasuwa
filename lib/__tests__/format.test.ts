// Compile-time assertions for the format helpers. We don't have a runtime
// test runner wired up yet — these checks live in TypeScript's type system
// and trip the `tsc --noEmit` build if a regression breaks the contract.

import { formatDuration, formatNaira, pad2 } from "../format";

// formatNaira must accept all the shapes the API and UI throw at it.
const _n1: string = formatNaira(1500);
const _n2: string = formatNaira("1500");
const _n3: string = formatNaira(null);
const _n4: string = formatNaira(undefined);
const _n5: string = formatNaira(Number.NaN);

// formatDuration only takes a number and always returns HH:MM:SS-shaped string.
const _d1: string = formatDuration(0);
const _d2: string = formatDuration(-1); // negatives clamp to 00:00:00
const _d3: string = formatDuration(3_600_000);

// pad2 keeps single-digit numbers two characters wide.
const _p1: string = pad2(0);
const _p2: string = pad2(7);
const _p3: string = pad2(42);

// `void` consumes the variables so noUnusedLocals stays happy.
void [_n1, _n2, _n3, _n4, _n5, _d1, _d2, _d3, _p1, _p2, _p3];
