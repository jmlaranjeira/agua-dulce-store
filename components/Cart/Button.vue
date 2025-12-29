<script setup lang="ts">
import { ShoppingBag } from 'lucide-vue-next'

const { itemCount, toggleCart } = useCart()
</script>

<template>
  <button
    class="relative p-2 text-warm-600 hover:text-gold-500 transition-colors"
    aria-label="Carrito"
    @click="toggleCart"
  >
    <ShoppingBag class="w-6 h-6" />
    <span
      v-if="itemCount > 0"
      class="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gold-500 rounded-full"
    >
      {{ itemCount > 99 ? '99+' : itemCount }}
    </span>
  </button>
</template>
