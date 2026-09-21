# Cloudflare Deployment

## Target

The production target for esmailzaee.ir is Cloudflare Pages using a static Next.js export.

Cloudflare's current documentation provides a specific deployment path for static Next.js sites on Pages.

## Build

The project will use:

```text
npx next build
```

with:

```text
output: "export"
```

The generated site will be placed in:

```text
out/
```

## Cloudflare Pages settings

Production branch:

```text
main
```

Framework preset:

```text
Next.js (Static HTML Export)
```

Build command:

```text
npx next build
```

Build output directory:

```text
out
```

## Domain

The production custom domain will be:

```text
esmailzaee.ir
```

Cloudflare DNS and SSL/TLS will remain responsible for the public domain.

## Compatibility rules

The application must not depend on:

- Next.js server runtime
- Server Actions
- Route Handlers
- dynamic server rendering
- runtime database access
- Vercel-only APIs
- Vercel-specific environment features

Client-side desktop behavior is allowed because it is compiled into the static site.

## Future expansion

If the website later needs server-side functionality, the architecture can be evaluated for Cloudflare Workers. The current version intentionally remains static.
