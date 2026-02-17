import { readJSON, removeKey, StorageKeys, writeJSON } from "../storage";

// readJSON returns the fallback when the slot is empty or on parse error.
const fallback: number[] = [];
const _r1: number[] = readJSON<number[]>("kasuwa::test::missing", fallback);

// writeJSON is fire-and-forget; the return type is `void`.
const _r2: void = writeJSON("kasuwa::test::list", [1, 2, 3]);
const _r3: void = removeKey("kasuwa::test::list");

// The shared StorageKeys registry should expose the well-known slots.
const _k1: string = StorageKeys.cart;
const _k2: string = StorageKeys.saved;
const _k3: string = StorageKeys.user;
const _k4: string = StorageKeys.farmer;
const _k5: string = StorageKeys.mainCountdownEnd;
const _k6: string = StorageKeys.flashSaleEnd;

void [_r1, _r2, _r3, _k1, _k2, _k3, _k4, _k5, _k6];
