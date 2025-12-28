# CLAUDE.md - Instrucciones para Claude Code

## Proyecto

Tienda pública online para venta de joyería (agua-dulce-store).
Complementa el CRM interno (agua-dulce-admin) y consume el API compartido (agua-dulce-api).

**Stack:** Nuxt 3 + TypeScript + Tailwind CSS

## Arquitectura

```
┌──────────────────┐     ┌──────────────────┐
│ agua-dulce-admin │     │ agua-dulce-store │  ← Este repo
│     (CRM)        │     │    (Tienda)      │
│     :3003        │     │     :3009        │
└────────┬─────────┘     └────────┬─────────┘
         │         HTTP           │
         └──────────┬─────────────┘
                    ▼
         ┌──────────────────┐
         │  agua-dulce-api  │
         │     :3006        │
         └──────────────────┘
```

## Estructura

```
agua-dulce-store/
├── pages/              # Rutas (auto-routing)
│   ├── index.vue       # Home
│   ├── catalogo.vue    # Grid de productos
│   └── producto/
│       └── [code].vue  # Ficha de producto
├── components/
│   ├── App/            # Layout (Header, Footer, WhatsAppButton)
│   └── Product/        # Componentes de producto (Card, Grid)
├── composables/        # Lógica reutilizable
│   ├── useProducts.ts  # Conexión con API
│   └── useWhatsApp.ts  # Generador de enlaces WA
├── types/              # Tipos TypeScript
├── server/api/         # Endpoints del servidor (sitemap)
└── assets/css/         # Estilos globales
```

## Comandos

```bash
PORT=3009 npm run dev   # Desarrollo
npm run build           # Build producción
npm run preview         # Preview del build
```

## Variables de entorno

```env
NUXT_PUBLIC_API_URL=http://localhost:3006
NUXT_PUBLIC_WHATSAPP_PHONE=34666666666
NUXT_PUBLIC_SITE_URL=http://localhost:3009
```

## Endpoints API consumidos

```
GET /public/products              # Lista productos (filtros: category, search, sortBy)
GET /public/products/featured     # Últimos 8 productos
GET /public/products/:code        # Detalle por código
```

## Convenciones

- Componentes Vue en PascalCase
- Composables con prefijo `use`
- Mobile-first (Tailwind responsive)
- SEO: usar `useSeoMeta()` en cada página
- Colores: `primary-*` (cálido) y `secondary-*` (neutro)

## Fases del proyecto

- **Fase 1** (actual): Catálogo + WhatsApp
- **Fase 2** (futuro): Carrito + Checkout manual (Bizum)
- **Fase 3** (futuro): Pasarela de pago (Stripe)

## No hacer

- No añadir login de usuarios (usar código de pedido)
- No hardcodear URLs del API (usar runtimeConfig)
- No crear componentes innecesarios para código usado una vez
