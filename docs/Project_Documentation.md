# Credi Neto - Project Documentation

## Project Structure
- **Nuxt 3**: Frontend framework.
- **Supabase**: Backend (Database, Auth).
- **Tailwind CSS**: Styling (Primary Color: `#d35322`).

## Database Schema (Supabase)
The database schema is defined in `supabase_schema.sql` in the root directory.
It includes:
- `profiles` table: Extends `auth.users`.
- `transactions` table: Stores credit modification history.
- `user_role` enum: `superadmin`, `admin`, `user`.

## RLS Policies
- Users can view their own profile and transactions.
- Admins can view all profiles and transactions.
- Only Admins can create transactions (add/remove credits).

## Environment Setup
1. Copy `.env.example` to `.env`.
2. Fill in `SUPABASE_URL` and `SUPABASE_KEY` from your Supabase project settings.

## Running the Project
```bash
npm install
npm run dev
```

## Icons
Use [Heroicons](https://heroicons.com/) or similar library (installed via Tailwind UI or `nuxt-icon` if needed). We will use text or standard SVG icons for now.
