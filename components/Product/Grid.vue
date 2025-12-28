<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'
import type { Product } from '~/types'

defineProps<{
  products: Product[]
  loading?: boolean
}>()
</script>

<template>
  <!-- Loading state -->
  <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
    <div v-for="n in 8" :key="n" class="animate-pulse">
      <div class="card overflow-hidden">
        <div class="aspect-square bg-cream-200" />
        <div class="p-4 space-y-3">
          <div class="h-4 bg-cream-200 rounded w-full" />
          <div class="h-3 bg-cream-200 rounded w-1/3" />
          <div class="h-5 bg-cream-200 rounded w-1/2" />
        </div>
      </div>
    </div>
  </div>

  <!-- Products grid -->
  <div
    v-else-if="products.length"
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
  >
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>

  <!-- Empty state -->
  <div v-else class="text-center py-16">
    <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-cream-200 flex items-center justify-center">
      <Sparkles class="w-10 h-10 text-cream-400" />
    </div>
    <p class="text-warm-600 text-lg font-medium">
      No se encontraron productos
    </p>
    <p class="mt-2 text-warm-400 text-sm">
      Prueba con otros filtros de búsqueda
    </p>
  </div>
</template>
