# esmailzaee.ir — Architecture

## Goal

A static personal website presented as a Linux-like desktop environment. The desktop is the primary navigation surface; conventional routes remain available for direct links and SEO.

## Core principles

1. Static-first: no runtime database or backend is required.
2. Canonical content is JSON.
3. TOON is a derived representation of canonical JSON, compatible with TOON v4.1.
4. UI state is client-side and ephemeral.
5. Content and presentation remain separated.
6. Every public route must work without requiring a server-side session.
7. Persian and English share stable content IDs; locale is presentation metadata.
8. Deployment target is Cloudflare.

## Pipeline

JSON → TOON projection → content loader → static pages/components → static export → Cloudflare

TOON is not independently maintained as a second source of truth.

## Technology direction

- Next.js App Router
- TypeScript
- Static generation
- Next.js static export
- CSS-first UI
- Minimal client-side JavaScript only where desktop interaction requires it
- Cloudflare Pages for the static deployment

The project deliberately avoids Vercel-specific APIs and server-only features so the generated site remains portable.

## Cloudflare deployment model

The application is built as a static Next.js export.

Build output:

- Next.js build command: `next build`
- Static output directory: `out/`

Cloudflare Pages receives the generated `out/` directory and serves the resulting HTML, CSS, JavaScript, images, fonts, and other static assets through Cloudflare's network.

If the project later requires server-side behavior, it can be evaluated for migration to Cloudflare Workers. That is intentionally outside version 1.

## Main UI

The home route renders the Personal Desktop:

- system bar
- desktop icons/files
- dock/navigation
- terminal
- movable/openable content windows
- locale switcher

## Public routes

- /
- /[locale]
- /[locale]/about
- /[locale]/profile
- /[locale]/projects
- /[locale]/skills
- /[locale]/activity
- /[locale]/contact

Project detail routes are generated from canonical project IDs/slugs.

## Non-goals

- No CMS
- No database
- No authentication
- No server-side user accounts
- No unnecessary API layer
- No Vercel-specific runtime dependency
