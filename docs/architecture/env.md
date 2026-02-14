# Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public anon key for browser queries.
- `SUPABASE_SERVICE_ROLE_KEY`: Server-only key for privileged operations.

## Rules

- Keep service role key server-side only.
- Never commit `.env.local`.
- Rotate leaked keys immediately.
