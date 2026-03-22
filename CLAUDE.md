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

## Styling

- NEVER hardcode colors — ALWAYS use CSS variables from `globals.css` (e.g., `bg-primary`, `text-muted-foreground`)
- If a new color is needed, add it as a CSS variable in `packages/ui/src/styles/globals.css` (both light and dark themes), then reference it via Tailwind
- Gradients MUST be defined as reusable classes in `globals.css` — NEVER inline gradient definitions in components
- This ensures consistency, dark mode support, and easy theme changes across the entire monorepo

## Validation

- ALL validations MUST happen on the backend
- Frontend is for presentation only — NEVER rely on frontend for security

## URL State (nuqs)

- ALWAYS use nuqs for any URL-driven state (filters, pagination, sorting, tabs)
- NEVER use `useSearchParams()` manually — nuqs handles URL state
- Define typed parsers in `search-params.ts` per feature/route
- Use `createSearchParamsCache` in Server Components to read search params
- Use `useQueryStates` in Client Components to read/write search params
- `NuqsAdapter` MUST be placed in the root layout

## API Client Generation (Orval)

- ALWAYS use Orval to generate API clients from the OpenAPI spec
- Config: React Query + fetch + tags-split
- Generated output goes to `src/api/endpoints/` and `src/api/model/`
- Use a custom mutator for auth headers
- NEVER edit generated files — they are overwritten on regeneration
- NEVER create manual query keys or fetch hooks when Orval already generates them for the endpoint
- Endpoints not covered by the OpenAPI spec follow the existing manual pattern
