<script setup lang="ts">
import { CheckCircle, Loader2 } from 'lucide-vue-next'

const route = useRoute()
const config = useRuntimeConfig()

useSeoMeta({
  title: 'Pago completado - Agua Dulce',
  description: 'Tu pago ha sido procesado correctamente.',
})

const sessionId = computed(() => route.query.session_id as string | undefined)
const isLoading = ref(true)
const error = ref('')
const orderData = ref<{
  trackingCode: string
  orderNumber: string
  status: string
  total: number
} | null>(null)

// Obtener información del pedido por session_id
onMounted(async () => {
  if (!sessionId.value) {
    error.value = 'No se encontró información del pago'
    isLoading.value = false
    return
  }

  try {
    const data = await $fetch<{
      trackingCode: string
      orderNumber: string
      status: string
      total: number
    }>(`${config.public.apiUrl}/public/orders/by-session/${sessionId.value}`)

    orderData.value = data

    // Redirigir a la página de tracking después de mostrar el mensaje
    setTimeout(() => {
      navigateTo(`/pedido/${data.trackingCode}`)
    }, 3000)
  } catch (err) {
    error.value = 'No se pudo obtener la información del pedido'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-cream-50 flex items-center justify-center p-6">
    <div class="max-w-md w-full text-center">
      <!-- Loading -->
      <template v-if="isLoading">
        <Loader2 class="w-16 h-16 text-gold-500 mx-auto animate-spin" />
        <h1 class="text-2xl font-serif font-semibold text-warm-800 mt-6">
          Verificando pago...
        </h1>
      </template>

      <!-- Error -->
      <template v-else-if="error">
        <div class="bg-red-50 border border-red-200 rounded-2xl p-8">
          <p class="text-red-600 mb-4">{{ error }}</p>
          <NuxtLink to="/" class="btn-primary inline-block">
            Volver a la tienda
          </NuxtLink>
        </div>
      </template>

      <!-- Success -->
      <template v-else-if="orderData">
        <div class="bg-white rounded-2xl p-8 shadow-soft border border-cream-200">
          <div
            class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle class="w-12 h-12 text-green-600" />
          </div>

          <h1 class="text-2xl font-serif font-semibold text-warm-800 mb-2">
            ¡Pago completado!
          </h1>

          <p class="text-warm-600 mb-6">
            Tu pedido <span class="font-semibold">{{ orderData.orderNumber }}</span>
            ha sido procesado correctamente.
          </p>

          <p class="text-sm text-warm-500 mb-6">
            Redirigiendo a los detalles del pedido...
          </p>

          <NuxtLink
            :to="`/pedido/${orderData.trackingCode}`"
            class="btn-primary inline-block"
          >
            Ver mi pedido
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>
