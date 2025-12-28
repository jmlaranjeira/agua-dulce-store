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
    <!-- Image -->
    <div class="aspect-square bg-secondary-50 rounded-xl overflow-hidden">
      <img
        v-if="product.imageUrl"
        :src="product.imageUrl"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      >
      <div
        v-else
        class="w-full h-full flex items-center justify-center text-secondary-200"
      >
        <Sparkles class="w-12 h-12" />
      </div>
    </div>

    <!-- Info -->
    <div class="mt-3 space-y-1">
      <h3 class="font-medium text-secondary-800 group-hover:text-primary-600 transition-colors line-clamp-2">
        {{ product.name }}
      </h3>
      <p class="text-sm text-secondary-500">
        {{ product.code }}
      </p>
      <p class="text-primary-600 font-semibold">
        {{ formatPrice(product.priceRetail) }}
      </p>
    </div>
  </NuxtLink>
</template>
