// Field-level validators shared between the signup form, the contact
// modal, and (eventually) the seller onboarding flow.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Nigerian phone numbers: optional +234 / 0 prefix, then 10 digits.
const PHONE_RE = /^(?:\+?234|0)?[789][01]\d{8}$/;
const NAME_RE = /^[A-Za-z][A-Za-z'\- ]{1,49}$/;

export type ValidationResult = { ok: true } | { ok: false; reason: string };

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  return PHONE_RE.test(value.replace(/\s+/g, ""));
}

export function isValidName(value: string): boolean {
  return NAME_RE.test(value.trim());
}

export function validateEmail(value: string): ValidationResult {
  if (!value.trim()) return { ok: false, reason: "Email is required." };
  if (!isValidEmail(value))
    return { ok: false, reason: "Enter a valid email address." };
  return { ok: true };
}

export function validatePassword(value: string): ValidationResult {
  if (value.length < 8) {
    return { ok: false, reason: "Password must be at least 8 characters." };
  }
  if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value)) {
    return {
      ok: false,
      reason:
        "Password needs upper-case, lower-case, and numeric characters.",
    };
  }
  return { ok: true };
}

export function validatePhone(value: string): ValidationResult {
  if (!value.trim()) return { ok: false, reason: "Phone number is required." };
  if (!isValidPhone(value))
    return { ok: false, reason: "Enter a valid Nigerian phone number." };
  return { ok: true };
}
