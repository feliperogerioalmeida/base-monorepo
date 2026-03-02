# Database Conventions

- One file per domain in `schemas/` (e.g., `auth.ts`)
- Barrel export in `schemas/index.ts` — new schemas MUST be added here
- Cross-file relations: import the table from the file where it was defined
- Pattern: `pgTable()` with indexes in 3rd argument, `relations()` defined after tables
- Foreign keys: `.references(() => table.id, { onDelete: "cascade" })`
- Column types: `text` for PKs, `timestamp` for dates, `boolean` for flags
