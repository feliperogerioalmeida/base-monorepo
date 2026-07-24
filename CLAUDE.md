# Monorepo Conventions

## Stack

- pnpm workspaces + Turborepo, packages scoped as `@workspace/*`
- ESM everywhere — imports MUST use `.js` extension
- Named exports only — NEVER use default exports
- All code MUST be written in English

### Apps

- `apps/backend` — Fastify API
- `apps/frontend` — Next.js web app (shadcn/ui via `@workspace/ui`)
- `apps/mobile` — React Native + Expo app, shipped to the Apple App Store and Google Play

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

## Styling (Web)

- NEVER hardcode colors — ALWAYS use CSS variables from `globals.css` (e.g., `bg-primary`, `text-muted-foreground`)
- If a new color is needed, add it as a CSS variable in `packages/ui/src/styles/globals.css` (both light and dark themes), then reference it via Tailwind
- Gradients MUST be defined as reusable classes in `globals.css` — NEVER inline gradient definitions in components
- This ensures consistency, dark mode support, and easy theme changes across the entire monorepo

## Mobile (React Native + Expo)

- `apps/mobile` runs on Expo + Expo Router, targeting the Apple App Store and Google Play
- File-based routing with Expo Router — screens live under `src/app/`, follow the `kebab-case` file rule
- Route files (`_layout`, screens) are the ONE allowed exception to the no-default-exports rule — Expo Router requires a default export per route
- Route groups mirror the web: `(auth)` for public screens, `(protected)` for authenticated ones; each layout guards its group with `authClient.useSession()`
- Screen components only compose — forms, hooks and logic live under `src/features/<feature>/`
- `process.env` is inlined statically by the bundler — read env vars ONLY through `src/config/env.ts`, NEVER with a computed key
- Start it with `pnpm --filter mobile start` — the app has NO `dev` script on purpose, so Metro stays out of `turbo run dev`
- Metro resolves workspace packages through `watchFolders`; `metro.config.js` falls back to the extensionless path so the monorepo's `.js`-suffixed ESM imports keep working against TypeScript sources

### Styling — NativeWind

- ALWAYS style with [NativeWind](https://www.nativewind.dev/) — Tailwind CSS for React Native via the `className` prop
- Pinned to NativeWind v4 + Tailwind v3 to stay aligned with React Native Reusables — do NOT upgrade to NativeWind v5 / Tailwind v4 without migrating the component layer
- NEVER use `StyleSheet.create` or inline `style={{ ... }}` objects when a Tailwind utility exists; reach for `style` only for the rare dynamic value Tailwind cannot express
- NEVER hardcode colors — use the theme tokens (`bg-primary`, `text-muted-foreground`, etc.)
- Theme tokens mirror the web palette from `packages/ui/src/styles/globals.css`. Adding or changing a color means updating THREE files in `apps/mobile`: `src/global.css` (`:root` + `.dark:root`), `tailwind.config.js` and `src/lib/theme.ts` (`THEME` + `NAV_THEME`)
- Colors that must be passed as props (e.g. `placeholderTextColor`) come from the `useThemeColors()` hook — NEVER from a literal

### Components — React Native Reusables

- ALWAYS build UI from [React Native Reusables](https://reactnativereusables.com/) — the shadcn/ui equivalent for React Native (mobile counterpart to `@workspace/ui` on web)
- Add components with `npx @react-native-reusables/cli@latest add <component>` (config in `components.json`); they land in `src/components/ui/`
- `cn` helper lives in `src/lib/utils.ts`; compose around the generated primitives instead of rewriting them
- NEVER use a raw `<Text>` from `react-native` — ALWAYS the `Text` primitive from `@/components/ui/text`, so theme and variants apply
- Mirror the web component API/naming wherever a screen has a web equivalent, so features stay consistent across platforms

### Authentication

- The auth client lives in `src/lib/auth-client.ts` (`better-auth` + `@better-auth/expo` + `expo-secure-store`), plugins mirroring the backend
- Zod schemas are SHARED with the web app — import from `@workspace/auth/schemas`, NEVER duplicate validation rules in the app
- Validation messages live in `src/features/auth/messages.ts`, screen copy in `src/features/auth/labels.ts` — NEVER hardcode user-facing strings in components
- Backend errors are translated in `src/features/auth/errors.ts` (`throwIfAuthError`) — reuse it instead of reading `result.error` inline
- Password reset on mobile uses the email OTP flow (`emailOtp.sendVerificationOtp` + `emailOtp.resetPassword`), NOT the web link flow — no deep link required
- The app scheme (`APP_SCHEME` in `@workspace/utils`) is registered in the backend's `trustedOrigins` and duplicated in `app.json` (which cannot import TS) — keep both in sync
- `better-auth`, `@better-auth/expo`, `@better-auth/core` and its peers (`@better-fetch/fetch`, `better-call`, `@better-auth/utils`) are pinned to EXACT versions in `apps/mobile`. pnpm resolves unsatisfied peers ignoring `overrides`, and a second copy of `@better-fetch/fetch` makes the `expoClient` plugin fail to type-check — keep them pinned and aligned when upgrading better-auth
- `react` / `react-dom` are pinned to `19.2.3` in the root `pnpm.overrides` because React Native 0.85.3 bundles `react-native-renderer@19.2.3`, which must match `react` EXACTLY at runtime — a newer React throws "Incompatible React versions" on device. The whole monorepo (web included) rides the same version, so bump all three together, driven by the RN version

## Validation

- ALL validations MUST happen on the backend
- Frontend is for presentation only — NEVER rely on frontend for security

## URL State (nuqs)

- Web only — on mobile, route state travels through Expo Router params (`useLocalSearchParams`)
- ALWAYS use nuqs for any URL-driven state (filters, pagination, sorting, tabs)
- NEVER use `useSearchParams()` manually — nuqs handles URL state
- Define typed parsers in `search-params.ts` per feature/route
- Use `createSearchParamsCache` in Server Components to read search params
- Use `useQueryStates` in Client Components to read/write search params
- `NuqsAdapter` MUST be placed in the root layout

## API Client Generation (Orval)

- ALWAYS use Orval to generate API clients from the OpenAPI spec
- Config: React Query + fetch + tags-split (`orval.config.ts` per app)
- Generated output goes to `src/api/endpoints/` and `src/api/model/`
- Use a custom mutator for auth headers
- The spec and the generated client are gitignored — regenerate with `pnpm orval` (the backend must be running)
- Mobile gotcha: Orval's bundled get-tsconfig cannot resolve Expo's exports-based `expo/tsconfig.base`, so mobile runs Orval via `scripts/orval.mjs`, which downloads the spec, swaps in a flat tsconfig during generation and restores the real one afterwards. `pnpm orval` already wraps this — do NOT call the `orval` binary directly in mobile
- NEVER edit generated files — they are overwritten on regeneration
- NEVER create manual query keys or fetch hooks when Orval already generates them for the endpoint
- Endpoints not covered by the OpenAPI spec follow the existing manual pattern
