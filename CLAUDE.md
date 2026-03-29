# Mr Merch

## Stack
- Expo (SDK 54) with Expo Router
- React Native with New Architecture enabled
- Supabase backend
- NativeWind (TailwindCSS) for styling
- TypeScript

## Guidelines
- Use Expo skills for design patterns, components, and best practices
- Style with NativeWind/Tailwind classes — avoid inline `style` props unless necessary
- Use `--legacy-peer-deps` when installing npm packages

## Supabase Backend Rules
- Every DDL change (tables, columns, RLS policies) **must** go through a migration via `mcp__supabase__apply_migration`
- Storage bucket creation, policies, and other non-DDL infra operations that can't be captured in a migration must be recorded as a migration too (use `on conflict` / `if not exists` to make them idempotent)
- Never run raw SQL (`execute_sql`) for schema changes — only use it for queries or one-off data fixes
- File uploads to storage (e.g. `supabase storage cp`) are not migrations, but the bucket and policy setup must be
