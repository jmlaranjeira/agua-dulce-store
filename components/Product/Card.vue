<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'
import { formatPrice } from '~/types'
import type { Product } from '~/types'

defineProps<{
  product: Product
}>()
</script>

<template>
  <NuxtLink
    :to="`/producto/${product.code}`"
    class="group block"
  >
    <!-- Card container -->
    <div class="card card-hover overflow-hidden">
      <!-- Image -->
      <div class="aspect-square bg-cream-100 overflow-hidden">
        <img
          v-if="product.imageUrl"
          :src="product.imageUrl"
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        >
        <div
          v-else
          class="w-full h-full flex items-center justify-center text-cream-400"
        >
          <Sparkles class="w-12 h-12" />
        </div>
      </div>

      <!-- Info -->
      <div class="p-4">
        <h3 class="font-medium text-warm-800 group-hover:text-gold-600 transition-colors duration-300 line-clamp-2 mb-1">
          {{ product.name }}
        </h3>
        <p class="text-xs text-warm-400 mb-2">
          Ref: {{ product.code }}
        </p>
        <p class="text-price text-lg">
          {{ formatPrice(product.priceRetail) }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
