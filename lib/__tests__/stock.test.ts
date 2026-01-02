import { parseStock, stockColorClass, stockLabel } from "../stock";

// `parseStock` always returns a defined `status` and a numeric `amount`.
const a = parseStock("0");
const b = parseStock("10");
const c = parseStock("100");
const d = parseStock(null);
const e = parseStock(undefined);
const f = parseStock("not a number");

for (const info of [a, b, c, d, e, f]) {
  const _amount: number = info.amount;
  const _status: "out" | "low" | "in" = info.status;
  const _label: string = stockLabel(info.status);
  const _color: string = stockColorClass(info.status);
  void [_amount, _status, _label, _color];
}

// Zero or non-numeric input collapses to the `out` state — checked at
// runtime rather than the type level since `parseStock` doesn't narrow.
function expectOut(status: "out" | "low" | "in"): void {
  if (status !== "out") throw new Error(`expected 'out', got '${status}'`);
}
expectOut(a.status);
expectOut(d.status);
expectOut(e.status);
expectOut(f.status);
