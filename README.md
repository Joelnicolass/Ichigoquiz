# Ichigoquiz — ¿Qué personaje sos?

PWA mobile-first (Next.js 15 + Framer Motion + Supabase) con estética brutalista / cómic-anime.
Respondé 8 preguntas y descubrí qué personaje de *Bleach* sos.

## Desarrollo

```bash
npm install
cp .env.example .env.local   # completar con las keys de Supabase
npm run dev
```

## Supabase

Tabla `results (id, character_id, created_at)` con RLS (solo `insert` para `anon`) y la función
`character_stats()` (security definer) que devuelve el conteo por personaje.

## Íconos

`node scripts/icons.mjs` regenera los PNG de la PWA con Playwright.
