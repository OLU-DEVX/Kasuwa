import {
  isValidEmail,
  isValidName,
  isValidPhone,
  validateEmail,
  validatePassword,
  validatePhone,
} from "../validate";

// Email
const _e1: boolean = isValidEmail("user@example.com");
const _e2: boolean = isValidEmail("not-an-email");
if (!validateEmail("foo").ok) {
  // ok branch unreachable here, just checking that the reason is a string.
}
const emailResult = validateEmail("user@example.com");
if (emailResult.ok) {
  // narrowed — no reason field.
}

// Phone — accepts 080..., +234080..., and rejects non-Nigerian.
const _p1: boolean = isValidPhone("08012345678");
const _p2: boolean = isValidPhone("+2348012345678");
const _p3: boolean = isValidPhone("12345");
if (!validatePhone("").ok) {
  // required guard fires.
}

// Password — checks length and character classes.
const _pw1 = validatePassword("short").ok; // false
const _pw2 = validatePassword("abcdefgh").ok; // false: no uppercase/digit
const _pw3 = validatePassword("Abcdefg1").ok; // true

// Name regex
const _n1: boolean = isValidName("Aisha");
const _n2: boolean = isValidName("A");

void [_e1, _e2, _p1, _p2, _p3, _pw1, _pw2, _pw3, _n1, _n2];
