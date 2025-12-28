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
    <section class="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div class="container-app py-16 md:py-24 lg:py-32">
        <div class="max-w-2xl">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-secondary-900 leading-tight">
            Joyería que cuenta
            <span class="text-primary-600">tu historia</span>
          </h1>
          <p class="mt-6 text-lg md:text-xl text-secondary-600 leading-relaxed">
            Piezas únicas creadas con amor y dedicación. Cada joya es especial,
            como tú.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <NuxtLink to="/catalogo" class="btn-primary">
              Ver catálogo
              <ArrowRight class="w-5 h-5" />
            </NuxtLink>
            <button class="btn-whatsapp" @click="openChat()">
              Contactar
            </button>
          </div>
        </div>
      </div>

      <!-- Decorative element -->
      <div class="absolute top-1/2 right-8 md:right-16 lg:right-24 -translate-y-1/2 opacity-10">
        <Sparkles class="w-48 h-48 md:w-64 md:h-64 text-primary-600" />
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 md:py-24 bg-white">
      <div class="container-app">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-serif font-semibold text-secondary-900">
            Lo más nuevo
          </h2>
          <p class="mt-4 text-secondary-600">
            Descubre nuestras últimas creaciones
          </p>
        </div>

        <!-- Loading state -->
        <div v-if="status === 'pending'" class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="n in 4" :key="n" class="animate-pulse">
            <div class="aspect-square bg-secondary-100 rounded-xl" />
            <div class="mt-3 h-4 bg-secondary-100 rounded w-3/4" />
            <div class="mt-2 h-4 bg-secondary-100 rounded w-1/2" />
          </div>
        </div>

        <!-- Products grid -->
        <div v-else-if="featuredProducts?.length" class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <NuxtLink
            v-for="product in featuredProducts"
            :key="product.id"
            :to="`/producto/${product.code}`"
            class="group"
          >
            <div class="aspect-square bg-secondary-50 rounded-xl overflow-hidden">
              <img
                v-if="product.imageUrl"
                :src="product.imageUrl"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              >
              <div v-else class="w-full h-full flex items-center justify-center text-secondary-300">
                <Sparkles class="w-12 h-12" />
              </div>
            </div>
            <div class="mt-3">
              <h3 class="font-medium text-secondary-800 group-hover:text-primary-600 transition-colors line-clamp-1">
                {{ product.name }}
              </h3>
              <p class="mt-1 text-primary-600 font-semibold">
                {{ formatPrice(product.priceRetail) }}
              </p>
            </div>
          </NuxtLink>
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-12">
          <Sparkles class="w-16 h-16 text-secondary-200 mx-auto" />
          <p class="mt-4 text-secondary-500">
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
    <section class="py-16 md:py-24 bg-secondary-50">
      <div class="container-app">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-serif font-semibold text-secondary-900">
            Hecho con amor
          </h2>
          <p class="mt-6 text-lg text-secondary-600 leading-relaxed">
            Cada pieza de Agua Dulce es única y está creada con materiales de
            calidad. Nos apasiona la joyería artesanal y ponemos todo nuestro
            cariño en cada diseño.
          </p>
          <button class="mt-8 btn-primary" @click="openChat()">
            Conócenos
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
