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

// Zero or non-numeric input collapses to the `out` state.
const _outA: "out" = a.status;
const _outD: "out" = d.status;
const _outE: "out" = e.status;
const _outF: "out" = f.status;
void [_outA, _outD, _outE, _outF];
