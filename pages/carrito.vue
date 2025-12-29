<script setup lang="ts">
import { ShoppingBag, Trash2, ArrowLeft, Minus, Plus } from 'lucide-vue-next'
import { formatPrice } from '~/types'

const { items, cartTotal, isEmpty, updateQuantity, removeFromCart, clearCart } = useCart()

useSeoMeta({
  title: 'Carrito - Agua Dulce',
  description: 'Tu carrito de compras en Agua Dulce, joyería artesanal.',
})
</script>

<template>
  <div class="min-h-screen">
    <div class="container-app py-6 md:py-10">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-2xl md:text-3xl font-serif font-semibold text-warm-800">
          Tu carrito
        </h1>
        <button
          v-if="!isEmpty"
          class="text-sm text-warm-500 hover:text-red-500 transition-colors"
          @click="clearCart"
        >
          Vaciar carrito
        </button>
      </div>

      <!-- Empty state -->
      <div v-if="isEmpty" class="text-center py-16">
        <ShoppingBag class="w-20 h-20 text-cream-300 mx-auto mb-6" />
        <h2 class="text-xl font-medium text-warm-600 mb-2">
          Tu carrito está vacío
        </h2>
        <p class="text-warm-500 mb-8">
          Explora nuestro catálogo y encuentra algo especial
        </p>
        <NuxtLink
          to="/catalogo"
          class="inline-flex items-center gap-2 btn-primary px-8 py-3"
        >
          <ArrowLeft class="w-5 h-5" />
          Ver catálogo
        </NuxtLink>
      </div>

      <!-- Cart content -->
      <div v-else class="grid lg:grid-cols-3 gap-8">
        <!-- Items list -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-soft border border-cream-200 overflow-hidden">
            <div
              v-for="item in items"
              :key="item.product.id"
              class="flex gap-4 p-4 border-b border-cream-200 last:border-0"
            >
              <!-- Image -->
              <NuxtLink
                :to="`/producto/${item.product.code}`"
                class="w-24 h-24 flex-shrink-0 bg-cream-100 rounded-xl overflow-hidden"
              >
                <img
                  v-if="item.product.imageUrl"
                  :src="item.product.imageUrl"
                  :alt="item.product.name"
                  class="w-full h-full object-cover"
                />
              </NuxtLink>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <NuxtLink
                  :to="`/producto/${item.product.code}`"
                  class="font-medium text-warm-800 hover:text-gold-600 transition-colors line-clamp-2"
                >
                  {{ item.product.name }}
                </NuxtLink>
                <p class="text-sm text-warm-500 mt-1">
                  {{ formatPrice(item.product.priceRetail) }} / unidad
                </p>

                <!-- Quantity controls -->
                <div class="flex items-center gap-4 mt-3">
                  <div class="flex items-center border border-cream-300 rounded-lg">
                    <button
                      class="p-2 text-warm-600 hover:text-gold-500 hover:bg-cream-100 rounded-l-lg transition-colors disabled:opacity-50"
                      :disabled="item.quantity <= 1"
                      @click="updateQuantity(item.product.id, item.quantity - 1)"
                    >
                      <Minus class="w-4 h-4" />
                    </button>
                    <span class="w-10 text-center font-medium">
                      {{ item.quantity }}
                    </span>
                    <button
                      class="p-2 text-warm-600 hover:text-gold-500 hover:bg-cream-100 rounded-r-lg transition-colors disabled:opacity-50"
                      :disabled="item.quantity >= 99"
                      @click="updateQuantity(item.product.id, item.quantity + 1)"
                    >
                      <Plus class="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    class="p-2 text-warm-400 hover:text-red-500 transition-colors"
                    aria-label="Eliminar"
                    @click="removeFromCart(item.product.id)"
                  >
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>
              </div>

              <!-- Subtotal -->
              <div class="text-right">
                <span class="font-semibold text-gold-600 text-lg">
                  {{ formatPrice(item.product.priceRetail * item.quantity) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="lg:col-span-1">
          <div class="bg-cream-50 rounded-2xl p-6 border border-cream-200 sticky top-24">
            <h2 class="text-lg font-semibold text-warm-800 mb-4">
              Resumen del pedido
            </h2>

            <div class="space-y-3 pb-4 border-b border-cream-200">
              <div class="flex justify-between text-warm-600">
                <span>Subtotal</span>
                <span>{{ formatPrice(cartTotal) }}</span>
              </div>
              <div class="flex justify-between text-warm-600">
                <span>Envío</span>
                <span class="text-sm">Se calculará al finalizar</span>
              </div>
            </div>

            <div class="flex justify-between items-center py-4">
              <span class="text-lg font-semibold text-warm-800">Total</span>
              <span class="text-2xl font-bold text-gold-600">
                {{ formatPrice(cartTotal) }}
              </span>
            </div>

            <NuxtLink
              to="/checkout"
              class="block w-full btn-primary py-4 text-center text-lg mt-4"
            >
              Finalizar compra
            </NuxtLink>

            <NuxtLink
              to="/catalogo"
              class="block w-full text-center text-warm-600 hover:text-gold-500 mt-4 transition-colors"
            >
              Seguir comprando
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
