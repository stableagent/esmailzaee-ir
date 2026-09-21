# esmailzaee.ir

A personal website presented as a Linux-style desktop environment.

## Architecture

- Next.js App Router + TypeScript
- Static export
- Cloudflare Pages deployment
- Canonical content in JSON
- TOON generated from canonical JSON
- Persian and English routes
- Client-side desktop windows and a safe simulated terminal

## Local development

npm install
npm run dev

Production build:

npm run generate:toon
npm run build

The static output is out/.

## Terminal

The terminal is intentionally simulated. It accepts only documented navigation commands and never executes arbitrary shell commands.

## Content rule

Edit files under content/canonical/. Generated .toon files are derived artifacts and are not independent sources of truth.
