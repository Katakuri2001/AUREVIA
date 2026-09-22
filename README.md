# AUREVIA

AUREVIA is a premium digital marketing agency experience built as a full-stack Next.js application and deployed to Cloudflare Workers. The site turns the agency philosophy — **ATTENTION → STORY → AMPLIFY → CONVERT → GROW** — into an editorial, cinematic, interactive narrative.

## Stack

- Next.js 16 App Router
- React 19 + TypeScript strict mode
- Tailwind CSS 4
- Three.js / React Three Fiber / drei for purposeful 3D
- GSAP + Lenis for motion
- Cloudflare Workers through `@opennextjs/cloudflare`
- Cloudflare D1 for relational data
- Cloudflare R2 for media objects
- Zod for server-side validation
- bcryptjs for password hashing

## Local development

```bash
npm install
npm run db:migrate:local
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The local development server uses Wrangler's simulated D1/R2 bindings through `initOpenNextCloudflareForDev()`.

## Cloudflare deployment

```bash
npm run db:migrate:remote
npm run db:seed:remote
npm run deploy
```

The Worker is named `aurevia`. Its bindings are:

- `DB` → `aurevia-db`
- `MEDIA_BUCKET` → `aurevia-media`
- `ASSETS` → OpenNext static assets

## Demo data

Seed data is explicitly marked as demo/fictional in the database and is intended for development and presentation only. Replace it with approved client content before a public launch.

The seeded demo administrator is:

- Email: `admin@aurevia.demo`
- Password: the value configured through `ADMIN_PASSWORD` during seeding

Change the password and rotate credentials before production use.

## GitHub

Repository: [github.com/Katakuri2001/AUREVIA](https://github.com/Katakuri2001/AUREVIA)
