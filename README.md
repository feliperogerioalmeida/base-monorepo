# Monorepo Starter

A production-ready monorepo boilerplate for full-stack TypeScript applications. Clone it, rename `@APP_NAME`, and start building.

## Tech Stack

| Layer       | Technology                                                       |
| ----------- | ---------------------------------------------------------------- |
| Monorepo    | pnpm workspaces + Turborepo                                     |
| Frontend    | Next.js 16 (App Router), React 19, Tailwind CSS 4               |
| Backend     | Fastify 5, Drizzle ORM, PostgreSQL                               |
| Auth        | Better Auth                                                      |
| UI          | shadcn/ui (Radix) + [shadcn-form](https://www.shadcn-form.com)   |
| Validation  | Zod                                                              |
| Linting     | ESLint (flat config) + Prettier + simple-import-sort              |
| Commits     | Conventional Commits (commitlint + Husky)                        |
| Releases    | Semantic Release (ready, not yet active)                         |
| Testing     | Vitest                                                           |

## Project Structure

```
.
├── apps/
│   ├── backend/          # Fastify API server
│   └── frontend/         # Next.js web application
├── packages/
│   ├── types/            # Shared TypeScript types (@workspace/types)
│   ├── ui/               # Shared UI components — shadcn/ui (@workspace/ui)
│   └── utils/            # Shared utility functions (@workspace/utils)
├── .husky/               # Git hooks (commit-msg, pre-commit)
├── .releaserc.json       # Semantic Release configuration
└── .lintstagedrc.json    # Lint-staged configuration
```

## Prerequisites

- Node.js >= 20
- pnpm >= 10
- PostgreSQL (for the backend)

## Getting Started

```bash
# Install dependencies
pnpm install

# Start all apps in development mode
pnpm dev

# Build all apps
pnpm build

# Run tests
pnpm test

# Lint staged files
pnpm lint

# Check formatting
pnpm format:check

# Type-check all packages
pnpm type-check
```

## Apps

### Frontend (`apps/frontend`)

Next.js 16 application with App Router, React 19, and built-in i18n support.

- Runs on port `3000`
- Uses `@workspace/ui` for shared components
- Namespace-based i18n dictionaries (`app/[lang]/dictionaries/<locale>/`)
- Theme switching with dark mode support

```bash
pnpm --filter frontend dev
```

### Backend (`apps/backend`)

Fastify 5 API server with Drizzle ORM and Better Auth.

- Layered architecture: Routes > Services > Repositories
- Zod request/response validation via `ZodTypeProvider`
- Swagger/OpenAPI documentation built-in

```bash
pnpm --filter backend dev
```

## Shared Packages

| Package            | Description                             |
| ------------------ | --------------------------------------- |
| `@workspace/types` | Shared TypeScript interfaces and types  |
| `@workspace/ui`    | shadcn/ui + [shadcn-form](https://www.shadcn-form.com) components, styles, and hooks |
| `@workspace/utils` | Shared utility functions                |

Packages are consumed via `workspace:*` protocol and resolved at runtime through TypeScript path aliases — no build step required.

## Conventions

- **ESM everywhere** — imports must use `.js` extension
- **Named exports only** — never use default exports
- **Conventional Commits** — scope is required (e.g., `feat(backend): add auth`)
- **All code in English**

See [`CLAUDE.md`](./CLAUDE.md) for the full set of coding conventions and patterns.

## License

ISC
