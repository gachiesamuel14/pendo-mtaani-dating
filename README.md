# Pendo Mtaani

Location-based dating app for Kenya. Connect with people nearby by county, distance, age, interests, tribe, religion, and lifestyle.

## Features (MVP Demo)

- User profiles with photos, bio, age, county
- GPS location request & nearby simulation
- Swipe interface (like / pass)
- Match simulation
- Filters: county, age range, distance
- Safety notes & report placeholder
- Ready for Supabase (auth, DB, realtime chat, storage)

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + React + Tailwind (via CDN for simplicity)
- **Backend/DB (recommended)**: Supabase (Auth, Postgres with PostGIS, Realtime, Storage)
- **Hosting**: Netlify + GitHub
- **Payments**: M-Pesa (Daraja API) for premium later

## Quick Start (Local)

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Netlify

1. In Netlify: New site from Git → select this repo (pendo-mtaani-dating).
2. Build command: `npm run build`
3. Publish directory: `.next` (Netlify Next.js plugin is already in netlify.toml)
4. Add environment variables if using Supabase:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY

## Full Production Setup (Recommended)

1. Create free Supabase project at supabase.com
2. Enable Auth (Email + Google optional)
3. Create tables:
   - profiles (id, name, age, gender, bio, county, lat, lng, interests[], photos[], preferences JSON)
   - likes, matches, messages
4. Enable PostGIS for real location queries (`ST_DWithin`)
5. Set up Storage for photo uploads
6. Use Supabase Realtime for chat
7. Add Row Level Security (RLS)
8. Integrate M-Pesa for premium (unlimited swipes, see who liked you, advanced filters)

## Kenya-specific Ideas

- County selector: Nairobi, Mombasa, Kisumu, Kiambu, Nakuru, Eldoret, etc.
- Sheng language support
- Modes: Student / Professional / Church
- M-Pesa premium subscriptions

## Safety

Always implement:
- Report & block
- Photo verification
- Age confirmation (18+)
- Location fuzzing (don't expose exact GPS)

Built for Kenyans to connect mtaani. 🇰🇪
