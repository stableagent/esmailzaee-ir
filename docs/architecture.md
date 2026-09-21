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

## Pipeline

JSON → TOON projection → content loader → static pages/components → Vercel/CDN

TOON is not independently maintained as a second source of truth.

## Technology direction

- Next.js App Router
- TypeScript
- Static generation
- CSS-first UI
- Minimal client-side JavaScript only where desktop interaction requires it
- Vercel deployment

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
