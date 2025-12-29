<script setup lang="ts">
import { X, ShoppingBag } from 'lucide-vue-next'
import { formatPrice } from '~/types'

const { items, isOpen, closeCart, cartTotal, isEmpty } = useCart()
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/50"
        @click="closeCart"
      />
    </Transition>

    <!-- Drawer -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isOpen"
        class="fixed top-0 right-0 z-50 w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-cream-200">
          <h2 class="font-serif text-xl font-semibold text-warm-800">
            Tu carrito
          </h2>
          <button
            class="p-2 text-warm-600 hover:text-warm-800 transition-colors"
            aria-label="Cerrar"
            @click="closeCart"
          >
            <X class="w-6 h-6" />
          </button>
        </div>

        <!-- Contenido -->
        <div class="flex-1 overflow-y-auto p-4">
          <!-- Vacío -->
          <div v-if="isEmpty" class="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag class="w-16 h-16 text-cream-300 mb-4" />
            <p class="text-warm-600 mb-2">Tu carrito está vacío</p>
            <NuxtLink
              to="/catalogo"
              class="text-gold-500 hover:text-gold-600 font-medium"
              @click="closeCart"
            >
              Ver catálogo
            </NuxtLink>
          </div>

          <!-- Lista de items -->
          <div v-else>
            <CartItem v-for="item in items" :key="item.product.id" :item="item" />
          </div>
        </div>

        <!-- Footer con total y botones -->
        <div v-if="!isEmpty" class="p-4 border-t border-cream-200 bg-cream-50">
          <div class="flex justify-between items-center mb-4">
            <span class="text-warm-600">Subtotal</span>
            <span class="text-xl font-bold text-gold-600">
              {{ formatPrice(cartTotal) }}
            </span>
          </div>

          <div class="flex flex-col gap-2">
            <NuxtLink
              to="/carrito"
              class="block w-full py-3 text-center border-2 border-gold-500 text-gold-600 font-semibold rounded-full hover:bg-gold-50 transition-colors"
              @click="closeCart"
            >
              Ver carrito
            </NuxtLink>
            <NuxtLink
              to="/checkout"
              class="block w-full py-3 text-center bg-gold-500 text-white font-semibold rounded-full hover:bg-gold-600 transition-colors"
              @click="closeCart"
            >
              Finalizar compra
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
