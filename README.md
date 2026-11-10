# Your Choice — Backend Starter

This is the next-stage source scaffold for turning the storefront demo into a real store.

## Stack
- Next.js App Router
- Supabase Auth + PostgreSQL
- Supabase Storage (product images)
- Server-side order creation
- Payment provider integration points (not activated)

## Setup
1. Create a Supabase project.
2. Copy `.env.example` to `.env.local` and fill in the project URL and keys.
3. Run `supabase/schema.sql` in Supabase SQL Editor.
4. Install dependencies with `npm install`.
5. Run `npm run dev`.

## Important
- No domain or hosting is purchased or connected.
- No real payment provider is connected. bKash/Nagad/card integration requires merchant approval and official credentials.
- Do not put the Supabase service-role key in browser code or share secrets in chat.
- Configure the first admin account manually in Supabase Auth, then assign the `admin` role in the `profiles` table.
- Review RLS policies, privacy policy, delivery/return terms, tax and local legal requirements before launch.
