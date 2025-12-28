# TODO: Mejoras SEO & Marketing

## Prioridad Alta

### Galería de imágenes por producto
- [ ] Añadir campo `images` (array) al modelo Product en el API
- [ ] Crear componente `ProductGallery.vue` con thumbnails
- [ ] Permitir subir múltiples fotos desde el admin
- [ ] Mostrar galería en ficha de producto

**Por qué:** Las joyas necesitan varias fotos (ángulos, detalle, escala en mano, etc.)

---

## Prioridad Media

### Optimización de imágenes
- [ ] Reemplazar `<img>` por `<NuxtImg>` en todos los componentes
- [ ] Configurar lazy loading nativo
- [ ] Añadir placeholders blur mientras cargan

**Archivos a modificar:**
- `components/Product/Card.vue`
- `pages/producto/[code].vue`
- `pages/index.vue`

### Meta descripciones con keywords
- [ ] Mejorar descripción de Home con keywords: "joyería artesanal España", "pendientes únicos", etc.
- [ ] Descripción dinámica en producto: incluir categoría, material, estilo
- [ ] Añadir keywords en catálogo según filtro activo

**Ejemplo mejorado:**
```typescript
// Antes
description: 'Joyería artesanal única.'

// Después
description: 'Descubre nuestra colección de joyería artesanal hecha en España. Pendientes, anillos y colgantes únicos de plata y oro. Envío a toda España.'
```

---

## Prioridad Baja

### Contenido enriquecido
- [ ] Añadir campo `description` a productos (texto largo)
- [ ] Sección "Sobre nosotros" con historia de la marca
- [ ] Blog/artículos sobre cuidado de joyas (genera tráfico orgánico)

### Structured Data (Schema.org)
- [ ] Añadir JSON-LD de tipo `Product` en ficha de producto
- [ ] Añadir JSON-LD de tipo `Organization` en layout

---

## Cuando tengamos dominio propio

- [ ] Configurar `NUXT_PUBLIC_SITE_URL` con dominio real
- [ ] Enviar sitemap a Google Search Console
- [ ] Verificar propiedad en Search Console
- [ ] Configurar Google Analytics (opcional)
