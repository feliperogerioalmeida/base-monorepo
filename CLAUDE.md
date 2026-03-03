# Monorepo Conventions

## Stack

- pnpm workspaces + Turborepo, packages scoped as `@workspace/*`
- ESM everywhere — imports MUST use `.js` extension
- Named exports only — NEVER use default exports
- All code MUST be written in English

## Commits

- Conventional Commits with scope required (e.g., `feat(backend): ...`)

## Releases

- Semantic Release on `main` branch — NOT active yet, will be enabled in CI after v1
- When active: NEVER version manually, commit types drive versioning (`fix` = patch, `feat` = minor, `BREAKING CHANGE` = major)
- CHANGELOG.md will be generated automatically — NEVER edit it by hand
- Config ready in `.releaserc.json`

## Tooling

- ESLint flat config with simple-import-sort
- Prettier with tailwind plugin

## Code Patterns

- DRY (Don't Repeat Yourself) — NEVER repeat code, extract to functions, hooks, or shared packages
- NEVER nest if/else — prefer early returns
- NEVER use comments — code must be self-explanatory (only when extremely necessary)
- ALWAYS move magic numbers to named constants
- Function names MUST be verbs, never nouns
- Methods MUST NOT exceed 50 lines
- Declare variables close to where they are used
- If a function receives more than 2 parameters, use an object parameter

## Naming

- `camelCase` — functions, variables
- `PascalCase` — classes, interfaces, components
- `kebab-case` — files, directories
- `SCREAMING_SNAKE_CASE` — constants

## TypeScript

- Use pnpm as package manager
- Prefer `const` over `let`, never use `var`
- Prefer `interface` over `type` (except for unions)
- Arrow functions, async/await
- NEVER use `any`, `var`, or `enum`
- Zod for runtime validation

## Validation

- ALL validations MUST happen on the backend
- Frontend is for presentation only — NEVER rely on frontend for security
