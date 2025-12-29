<script setup lang="ts">
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-vue-next'
import type { CartItem } from '~/types'
import { formatPrice } from '~/types'

const props = defineProps<{
  item: CartItem
}>()

const { updateQuantity, removeFromCart } = useCart()

function increment() {
  updateQuantity(props.item.product.id, props.item.quantity + 1)
}

function decrement() {
  updateQuantity(props.item.product.id, props.item.quantity - 1)
}

function remove() {
  removeFromCart(props.item.product.id)
}

const subtotal = computed(
  () => props.item.product.priceRetail * props.item.quantity
)
</script>

<template>
  <div class="flex gap-4 py-4 border-b border-cream-200 last:border-0">
    <!-- Imagen -->
    <div class="w-20 h-20 flex-shrink-0 bg-cream-100 rounded-lg overflow-hidden">
      <img
        v-if="item.product.imageUrl"
        :src="item.product.imageUrl"
        :alt="item.product.name"
        class="w-full h-full object-cover"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center text-warm-400"
      >
        <ShoppingBag class="w-8 h-8" />
      </div>
    </div>

    <!-- Info -->
    <div class="flex-1 min-w-0">
      <h4 class="font-medium text-warm-800 truncate">
        {{ item.product.name }}
      </h4>
      <p class="text-sm text-warm-500">
        {{ formatPrice(item.product.priceRetail) }}
      </p>

      <!-- Controles de cantidad -->
      <div class="flex items-center gap-3 mt-2">
        <div class="flex items-center border border-cream-300 rounded-lg">
          <button
            class="p-1.5 text-warm-600 hover:text-gold-500 hover:bg-cream-100 rounded-l-lg transition-colors disabled:opacity-50"
            :disabled="item.quantity <= 1"
            @click="decrement"
          >
            <Minus class="w-4 h-4" />
          </button>
          <span class="w-8 text-center text-sm font-medium">
            {{ item.quantity }}
          </span>
          <button
            class="p-1.5 text-warm-600 hover:text-gold-500 hover:bg-cream-100 rounded-r-lg transition-colors disabled:opacity-50"
            :disabled="item.quantity >= 99"
            @click="increment"
          >
            <Plus class="w-4 h-4" />
          </button>
        </div>

        <button
          class="p-1.5 text-warm-400 hover:text-red-500 transition-colors"
          aria-label="Eliminar"
          @click="remove"
        >
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Subtotal -->
    <div class="text-right">
      <span class="font-semibold text-gold-600">
        {{ formatPrice(subtotal) }}
      </span>
    </div>
  </div>
</template>
