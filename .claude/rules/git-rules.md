# Git Rules

## Commit Format — Conventional Commits
- Format: `type(scope): short description in English`
- Types: feat, fix, refactor, chore, style, docs, test
- Scope: the section/component affected (header, cart, product, footer, global)
- Description: imperative mood, lowercase, no period at the end
- Examples:
  - `feat(header): add sticky navigation on scroll`
  - `fix(cart): prevent double submission on checkout`
  - `refactor(product): extract price logic into snippet`
  - `style(footer): adjust spacing for mobile breakpoint`
  - `chore: update locales with new translation keys`

## Branch Naming
- Feature: `feature/short-description` (e.g., feature/mega-menu)
- Bug fix: `fix/short-description` (e.g., fix/cart-total-rounding)
- Hotfix: `hotfix/short-description` (e.g., hotfix/checkout-crash)
- Always lowercase, use hyphens, keep it short and descriptive

## Branch Workflow
- Create branch from develop (or main if hotfix)
- One branch per ticket/task — do not mix unrelated changes
- Push branch and open a Pull Request before merging
- PR must be reviewed (by lead or Claude) before merge
- After merge, delete the branch and its preview theme in Shopify

## Pull Request Rules
- PR title follows commit format: `feat(header): add sticky navigation`
- PR description must include: what was done, how to test, screenshots if visual
- Never merge your own PR without review (unless hotfix emergency)

## Strict Rules
- NEVER push directly to main or develop — always use branches + PR
- NEVER force push to shared branches (main, develop)
- NEVER commit .env files, API keys, or secrets
- NEVER commit node_modules/ or generated files
- One commit per logical change — do not bundle unrelated changes
