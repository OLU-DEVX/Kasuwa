import { resolveDiscount } from "../discount";

// A known code on a sufficiently-large basket resolves cleanly.
const ok = resolveDiscount("welcome10", 5000);
if (ok.ok) {
  const _amount: number = ok.amount;
  const _code: string = ok.discount.code;
  void [_amount, _code];
}

// Unknown codes return a tagged failure with a human-readable reason.
const unknown = resolveDiscount("zzz", 5000);
if (!unknown.ok) {
  const _reason:
    | "unknown_code"
    | "below_minimum"
    | "empty_code" = unknown.reason;
  const _message: string = unknown.message;
  void [_reason, _message];
}

// Minimum-subtotal gating: BULK5 needs at least ₦25,000 in the basket.
const tooSmall = resolveDiscount("BULK5", 100);
if (!tooSmall.ok) {
  const _isBelowMin: boolean = tooSmall.reason === "below_minimum";
  void _isBelowMin;
}

// Empty code rejects with the dedicated `empty_code` reason.
const empty = resolveDiscount("", 100);
if (!empty.ok) {
  const _isEmpty: boolean = empty.reason === "empty_code";
  void _isEmpty;
}
