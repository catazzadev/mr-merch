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

## Image Handling
- Before uploading images to Supabase Storage, optimize them: resize to max 800px on longest side, JPEG quality 70 (`sips -Z 800 --setProperty formatOptions 70`)
- Upload with long cache headers: `--cache-control "max-age=31536000"` (1 year)
- Use `getImageUrl()` from `lib/chapters.ts` to get public URLs (no server-side transforms — free plan doesn't support them)
- Use `expo-image` (not RN `Image`) for all remote images — it provides disk + memory caching via `cachePolicy="disk"`
- Store full storage paths in DB including bucket name (e.g. `assets/chapters/mr_milan/cover.jpeg`)

## Development
- Using development builds (not Expo Go) — native modules like `expo-image`, `expo-linear-gradient` require dev builds
- Build with: `eas build -p android --profile development --local`
