<script setup lang="ts">
import { XCircle, ShoppingCart, MessageCircle } from 'lucide-vue-next'

const route = useRoute()
const config = useRuntimeConfig()

useSeoMeta({
  title: 'Pago cancelado - Agua Dulce',
  description: 'El proceso de pago ha sido cancelado.',
})

const trackingCode = computed(() => route.query.tracking_code as string | undefined)
const whatsappNumber = config.public.whatsappPhone || ''

function openWhatsApp() {
  const message = encodeURIComponent(
    'Hola, tuve problemas con el pago de mi pedido y necesito ayuda.',
  )
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
}
</script>

<template>
  <div class="min-h-screen bg-cream-50 flex items-center justify-center p-6">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-2xl p-8 shadow-soft border border-cream-200 text-center">
        <div
          class="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <XCircle class="w-12 h-12 text-amber-600" />
        </div>

        <h1 class="text-2xl font-serif font-semibold text-warm-800 mb-2">
          Pago no completado
        </h1>

        <p class="text-warm-600 mb-6">
          El proceso de pago fue cancelado o no se completó.
          No te preocupes, no se ha realizado ningún cargo.
        </p>

        <div class="space-y-3">
          <!-- Volver al carrito -->
          <NuxtLink to="/carrito" class="btn-primary w-full flex items-center justify-center gap-2">
            <ShoppingCart class="w-5 h-5" />
            Volver al carrito
          </NuxtLink>

          <!-- Elegir otro método -->
          <NuxtLink
            to="/checkout"
            class="btn-secondary w-full"
          >
            Elegir otro método de pago
          </NuxtLink>

          <!-- Contactar -->
          <button
            class="w-full text-warm-600 hover:text-gold-600 flex items-center justify-center gap-2 py-3 transition-colors"
            @click="openWhatsApp"
          >
            <MessageCircle class="w-5 h-5" />
            ¿Necesitas ayuda? Contáctanos
          </button>
        </div>
      </div>

      <p class="text-center text-sm text-warm-500 mt-6">
        Tu carrito sigue guardado y puedes completar la compra cuando quieras.
      </p>
    </div>
  </div>
</template>
