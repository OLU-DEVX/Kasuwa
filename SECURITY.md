# Security Policy

## Reporting a vulnerability

If you believe you have found a security issue in Kasuwa, please **do not open
a public GitHub issue**. Instead, email the maintainers privately so we can
investigate and ship a fix before details become public.

When reporting, include:

- A short description of the issue
- Steps to reproduce (a minimal repro is ideal)
- The impact you believe it has and any suggested remediation

We aim to acknowledge new reports within **3 business days** and to publish a
fix or mitigation within **30 days** for high-severity issues.

## Scope

The following are in scope for reports:

- The Next.js client in this repository
- Authentication, signup, and password reset flows
- Cart, checkout, and Paystack integration code paths
- Seller dashboard and product management

The following are **out of scope**:

- Findings that require physical access to a victim's device
- Self-XSS or social-engineering attacks
- Outdated dependencies without a demonstrated impact
- Issues in third-party services (Paystack, Render, Next.js itself) — please
  report those to the relevant vendor

## Hardening expectations

- Never commit real credentials. Use `.env.local` (gitignored) for secrets and
  document new variables in `.env.example`.
- Treat all user-supplied input as untrusted — validate it client-side for UX
  but enforce on the backend.
- Prefer `NEXT_PUBLIC_*` env vars only for values that are genuinely safe to
  ship to the browser (e.g. Paystack *public* keys).
