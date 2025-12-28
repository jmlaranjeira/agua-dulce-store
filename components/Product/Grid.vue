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
      <div class="aspect-square bg-secondary-100 rounded-xl" />
      <div class="mt-3 space-y-2">
        <div class="h-4 bg-secondary-100 rounded w-full" />
        <div class="h-3 bg-secondary-100 rounded w-1/2" />
        <div class="h-4 bg-secondary-100 rounded w-1/3" />
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
    <Sparkles class="w-16 h-16 text-secondary-200 mx-auto" />
    <p class="mt-4 text-secondary-500 text-lg">
      No se encontraron productos
    </p>
    <p class="mt-2 text-secondary-400 text-sm">
      Prueba con otros filtros de búsqueda
    </p>
  </div>
</template>
