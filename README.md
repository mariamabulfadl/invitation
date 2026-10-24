# Marwan & Sohila engagement invitation

A responsive Next.js invitation for 27 November 2026, ready for Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Update event details

Edit [`src/data/event.ts`](src/data/event.ts). The time is intentionally `null` because no event time was supplied. The countdown targets the start of 27 November in Cairo, and the calendar download is an all-day event. Once the actual time is known, set `time` to a 24-hour value such as `"19:30"` in that file. The calendar and countdown will use it automatically.

The location and photo buttons open the supplied Google Maps and Google Drive links in new tabs. The photo button does not upload files itself; guests use the linked Drive folder.

Optional background music: add `public/music.mp3`. The play control appears only when that file is present. Playback starts only after a guest clicks it.

For a custom domain, set `NEXT_PUBLIC_SITE_URL` to its full URL in Vercel so Open Graph image URLs use that domain. Without it, Vercel's deployment URL is used.

## Deploy to Vercel

Import this folder as a Next.js project. No special build settings are required. Run `npm run build` before deployment.

The hero art and editorial venue visual were generated from the supplied invitation and SOLA venue references. The generated venue image is an interpretation, not a documentary photograph of the venue.
