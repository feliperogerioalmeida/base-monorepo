# Frontend Conventions

## Stack

- Next.js App Router, React 19

## File Organization

- ALWAYS componentize — break pages into small, focused components for readability
- Each page route MAY have a `_components/` folder for components exclusive to that page — but ONLY when `page.tsx` would become too large or complex without it. If the page is simple (e.g., just renders a single shared component with props), keep everything in `page.tsx` directly
- `_components/` contains block/section components that compose the `page.tsx`
- Shared components used across multiple pages go in the top-level `components/` folder
- Keep `page.tsx` clean — it should mostly compose components, not contain logic or markup

## Components

- Prefer Server Components — use `'use client'` only when strictly necessary (event handlers, browser APIs, hooks, client libs)
- Functional components only
- **ALWAYS** use shadcn/ui from `@workspace/ui` — NEVER create custom HTML elements when shadcn provides a component
- For advanced form components (autocomplete, tags input, etc.) use [shadcn-form](https://www.shadcn-form.com) — check there before building custom form inputs
- Add shadcn components: `cd packages/ui && pnpm dlx shadcn@latest add [component]`, then move and fix imports

## Data Fetching

- React Query (TanStack Query) in Client Components
- Native `fetch` in Server Components
- NEVER use `useEffect` — ALWAYS prefer React Query, event handlers, Server Components, or render-time logic
- Redirects based on state (e.g., session check) go directly in the render body — NEVER wrap `router.replace()` in `useEffect`
- `console.error` / `console.log` go directly in the render body — NEVER wrap logging in `useEffect`
- The ONLY accepted uses of `useEffect`: hydration guards (e.g., `next-themes` mounted pattern) and fire-on-mount side effects with no user interaction trigger (e.g., auto-verify token on page load)
- Prefer `setQueryData` over `invalidateQueries` for optimistic updates
- Mutations: `useMutation` from React Query

## Forms

- ALWAYS use react-hook-form + Zod resolver + shadcn `<Form>` component — NEVER build forms with raw HTML inputs
- EVERY form MUST have a Zod schema for validation
- Number inputs: react-number-format

## Charts

- ALWAYS use shadcn/ui chart components (based on Recharts) — NEVER install or use a chart library directly

## Styling

- NEVER hardcode colors (e.g., `bg-[#0D1B2A]`, `text-white`) — ALWAYS use CSS variable classes (`bg-primary`, `text-card-foreground`)
- If a color does not exist in the theme, add it as a CSS variable in `packages/ui/src/styles/globals.css` (both `:root` and `.dark`) and map it in `@theme inline`
- Gradients MUST be defined as reusable classes in `globals.css` (e.g., `.gradient-primary`) — NEVER write inline `bg-gradient-to-*` with hardcoded color stops in components
- `cn()` for conditional classes
- Mobile-first responsive design

## State

- Context API when prop drilling exceeds 3 levels
- React Query cache for server state
- Custom hooks prefixed with `use`
- Avoid `useMemo`/`useCallback` unless a proven performance issue exists

## Dates

- Dates arrive from the API in UTC
- Use dayjs with UTC plugin and `.local()` to display dates in the user's timezone
- NEVER manipulate dates without dayjs — avoid raw `Date` objects

## i18n / Dictionaries

- **NEVER hardcode user-facing strings** — ALL visible text (labels, messages, buttons, errors, page titles) MUST come from dictionaries
- The ONLY exception is `global-error.tsx`, which replaces the entire HTML and has no access to providers or CSS
- Dictionaries live in `app/[lang]/dictionaries/<locale>/` — one folder per locale (e.g., `pt-BR/`, `en-US/`)
- Each namespace is a separate `.json` file (e.g., `home.json`, `common.json`)
- `common.json` holds shared strings (navbar, footer, generic buttons, error/not-found pages)
- One `.json` file per page/feature — filename matches the namespace
- Use `getNamespace("home", locale)` in pages — loads only the needed namespace
- Use `getDictionary(locale)` only when ALL namespaces are needed
- When creating a new page, add its `.json` in every locale folder and update `dictionary.types.ts` + `dictionaries.ts` loaders
- Types are defined in `lib/dictionary.types.ts` — each namespace has its own interface
- Client Components that cannot use `server-only` loaders MAY import the JSON directly as a static import

## Authentication

- ALWAYS use `authClient.useSession()` from `@workspace/auth/client` to check session state — NEVER roll custom session checks
- Route group `(auth)` — public pages (sign-in, sign-up, etc.). Layout MUST redirect to `/dashboard` if session exists
- Route group `(protected)` — authenticated pages. Layout MUST redirect to `/sign-in` if no session
- Pages that require a token via searchParams (reset-password, verify-email) MUST `redirect("/sign-in")` if token is missing
- Session check pattern in layouts: `isPending` → show spinner, `session` resolved → render or redirect

## Security

- Frontend only hides/shows UI — NEVER rely on frontend for permissions or security
- All validations happen on the backend — frontend only displays data
