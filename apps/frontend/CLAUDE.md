# Frontend Conventions

## Stack

- Next.js App Router, React 19

## Components

- Prefer Server Components — use `'use client'` only when strictly necessary (event handlers, browser APIs, hooks, client libs)
- Functional components only
- **ALWAYS** use shadcn/ui from `@workspace/ui` — NEVER create custom HTML elements when shadcn provides a component
- Add shadcn components: `cd packages/ui && pnpm dlx shadcn@latest add [component]`, then move and fix imports

## Data Fetching

- React Query (TanStack Query) in Client Components
- Native `fetch` in Server Components
- Prefer `setQueryData` over `invalidateQueries` for optimistic updates
- Mutations: `useMutation` from React Query

## Forms

- react-hook-form + Zod + shadcn Form
- Number inputs: react-number-format

## Styling

- Tailwind CSS variables only — never hardcode colors
- `cn()` for conditional classes
- Mobile-first responsive design

## State

- Context API when prop drilling exceeds 3 levels
- React Query cache for server state
- Custom hooks prefixed with `use`
- Avoid `useMemo`/`useCallback` unless a proven performance issue exists

## Security

- Frontend only hides/shows UI — NEVER rely on frontend for permissions or security
- All validations happen on the backend — frontend only displays data
