# Frontend Conventions

## Stack

- Next.js App Router, React 19

## File Organization

- ALWAYS componentize — break pages into small, focused components for readability
- Each page route MAY have a `_components/` folder for components exclusive to that page
- `_components/` contains block/section components that compose the `page.tsx`
- Shared components used across multiple pages go in the top-level `components/` folder
- Keep `page.tsx` clean — it should mostly compose components, not contain logic or markup

## Components

- Prefer Server Components — use `'use client'` only when strictly necessary (event handlers, browser APIs, hooks, client libs)
- Functional components only
- **ALWAYS** use shadcn/ui from `@workspace/ui` — NEVER create custom HTML elements when shadcn provides a component
- Add shadcn components: `cd packages/ui && pnpm dlx shadcn@latest add [component]`, then move and fix imports

## Data Fetching

- React Query (TanStack Query) in Client Components
- Native `fetch` in Server Components
- NEVER use `useEffect` unless strictly necessary — ALWAYS prefer React Query, event handlers, or Server Components
- Prefer `setQueryData` over `invalidateQueries` for optimistic updates
- Mutations: `useMutation` from React Query

## Forms

- ALWAYS use react-hook-form + Zod resolver + shadcn `<Form>` component — NEVER build forms with raw HTML inputs
- EVERY form MUST have a Zod schema for validation
- Number inputs: react-number-format

## Charts

- ALWAYS use shadcn/ui chart components (based on Recharts) — NEVER install or use a chart library directly

## Styling

- Tailwind CSS variables only — never hardcode colors
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

- Dictionaries live in `app/[lang]/dictionaries/<locale>/` — one folder per locale (e.g., `pt-BR/`, `en-US/`)
- Each namespace is a separate `.json` file (e.g., `home.json`, `common.json`)
- `common.json` holds shared strings (navbar, footer, generic buttons)
- One `.json` file per page/feature — filename matches the namespace
- Use `getNamespace("home", locale)` in pages — loads only the needed namespace
- Use `getDictionary(locale)` only when ALL namespaces are needed
- When creating a new page, add its `.json` in every locale folder and update `dictionary.types.ts` + `dictionaries.ts` loaders
- Types are defined in `lib/dictionary.types.ts` — each namespace has its own interface

## Security

- Frontend only hides/shows UI — NEVER rely on frontend for permissions or security
- All validations happen on the backend — frontend only displays data
