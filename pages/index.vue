<script setup lang="ts">
import { ArrowRight, Sparkles } from 'lucide-vue-next'
import { formatPrice } from '~/types'
import type { Product } from '~/types'

const { getFeatured } = useProducts()
const { openChat } = useWhatsApp()

// SEO
useSeoMeta({
  title: 'Agua Dulce - Joyería Artesanal',
  description: 'Descubre nuestra colección de joyería artesanal. Pendientes, anillos y colgantes únicos, hechos con amor.',
  ogTitle: 'Agua Dulce - Joyería Artesanal',
  ogDescription: 'Descubre nuestra colección de joyería artesanal. Pendientes, anillos y colgantes únicos, hechos con amor.',
  ogType: 'website',
})

// Fetch featured products
const { data: featuredProducts, status } = await useAsyncData<Product[]>(
  'featured-products',
  () => getFeatured(),
  { default: () => [] }
)
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[70vh] flex items-center bg-gradient-to-br from-cream-100 via-cream-50 to-rose-100">
      <!-- Background pattern -->
      <div class="absolute inset-0 opacity-30">
        <div class="absolute top-20 right-10 w-72 h-72 bg-gold-200 rounded-full blur-3xl" />
        <div class="absolute bottom-20 left-10 w-96 h-96 bg-rose-200 rounded-full blur-3xl" />
      </div>

      <div class="container-app py-16 md:py-24 relative z-10">
        <div class="max-w-2xl">
          <!-- Badge -->
          <span class="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 text-sm font-medium rounded-full mb-6">
            Joyería Artesanal
          </span>

          <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-warm-800 leading-tight">
            Piezas únicas que cuentan
            <span class="text-gold-500">tu historia</span>
          </h1>

          <p class="mt-6 text-lg md:text-xl text-warm-500 leading-relaxed">
            Cada joya es especial, como tú. Descubre nuestra colección de
            pendientes, anillos y colgantes hechos con amor.
          </p>

          <div class="mt-10 flex flex-wrap gap-4">
            <NuxtLink to="/catalogo" class="btn-primary text-lg px-8">
              Ver catálogo
              <ArrowRight class="w-5 h-5" />
            </NuxtLink>
            <button class="btn-outline text-lg" @click="openChat()">
              Contactar
            </button>
          </div>
        </div>
      </div>

      <!-- Decorative sparkle -->
      <div class="absolute top-1/3 right-[15%] hidden lg:block opacity-20">
        <Sparkles class="w-32 h-32 text-gold-500" />
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 md:py-24 bg-white">
      <div class="container-app">
        <!-- Section header -->
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-serif font-semibold text-warm-800">
            Lo más nuevo
          </h2>
          <div class="divider-gold mx-auto mt-4" />
          <p class="mt-4 text-warm-500">
            Descubre nuestras últimas creaciones
          </p>
        </div>

        <!-- Loading state -->
        <div v-if="status === 'pending'" class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div v-for="n in 4" :key="n" class="animate-pulse">
            <div class="card overflow-hidden">
              <div class="aspect-square bg-cream-200" />
              <div class="p-4 space-y-3">
                <div class="h-4 bg-cream-200 rounded w-3/4" />
                <div class="h-4 bg-cream-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        </div>

        <!-- Products grid -->
        <div v-else-if="featuredProducts?.length" class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-12">
          <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-cream-200 flex items-center justify-center">
            <Sparkles class="w-10 h-10 text-cream-400" />
          </div>
          <p class="text-warm-500">
            Pronto añadiremos nuevos productos
          </p>
        </div>

        <!-- CTA -->
        <div class="mt-12 text-center">
          <NuxtLink to="/catalogo" class="btn-outline">
            Ver todo el catálogo
            <ArrowRight class="w-5 h-5" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-16 md:py-24 bg-cream-100">
      <div class="container-app">
        <div class="max-w-3xl mx-auto text-center">
          <span class="inline-block px-4 py-1.5 bg-rose-200 text-warm-700 text-sm font-medium rounded-full mb-6">
            Nuestra esencia
          </span>
          <h2 class="text-3xl md:text-4xl font-serif font-semibold text-warm-800">
            Hecho con amor
          </h2>
          <div class="divider-gold mx-auto mt-4" />
          <p class="mt-6 text-lg text-warm-500 leading-relaxed">
            Cada pieza de Agua Dulce es única y está creada con materiales de
            calidad. Nos apasiona la joyería artesanal y ponemos todo nuestro
            cariño en cada diseño para que encuentres algo especial.
          </p>
          <button class="mt-10 btn-primary" @click="openChat()">
            Conócenos
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
