<script setup lang="ts">
import {
  CheckCircle,
  Clock,
  Truck,
  Package,
  XCircle,
  Smartphone,
  Building,
  Copy,
  Check,
} from 'lucide-vue-next'
import { formatPrice } from '~/types'
import type { OrderStatusResponse } from '~/types'

const route = useRoute()
const { getOrderStatus } = useOrders()

const trackingCode = route.params.trackingCode as string

// Fetch order
const {
  data: order,
  error,
  refresh,
} = await useAsyncData<OrderStatusResponse>(`order-${trackingCode}`, () =>
  getOrderStatus(trackingCode)
)

// Handle 404
if (error.value || !order.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Pedido no encontrado',
  })
}

useSeoMeta({
  title: () => `Pedido ${order.value?.orderNumber} - Agua Dulce`,
  description: 'Estado de tu pedido en Agua Dulce',
})

// Status icon and color
const statusConfig = computed(() => {
  const configs: Record<
    string,
    { icon: typeof CheckCircle; color: string; bg: string }
  > = {
    PENDING: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-100' },
    PAID: { icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-100' },
    SHIPPED: { icon: Truck, color: 'text-indigo-500', bg: 'bg-indigo-100' },
    DELIVERED: { icon: Package, color: 'text-green-500', bg: 'bg-green-100' },
    CANCELLED: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-100' },
  }
  return configs[order.value?.status || 'PENDING']
})

// Copy tracking code
const copied = ref(false)
async function copyTrackingCode() {
  try {
    await navigator.clipboard.writeText(trackingCode)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // Fallback
  }
}

// Format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="min-h-screen bg-cream-50">
    <div class="container-app py-6 md:py-10">
      <!-- Success header -->
      <div class="text-center mb-10">
        <div
          class="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
          :class="statusConfig.bg"
        >
          <component
            :is="statusConfig.icon"
            class="w-10 h-10"
            :class="statusConfig.color"
          />
        </div>

        <h1 class="text-2xl md:text-3xl font-serif font-semibold text-warm-800">
          {{ order?.status === 'PENDING' ? '¡Pedido recibido!' : order?.statusLabel }}
        </h1>

        <p class="text-warm-600 mt-2">
          <template v-if="order?.status === 'PENDING'">
            Gracias por tu compra. A continuación te indicamos cómo realizar el pago.
          </template>
          <template v-else>
            Tu pedido está en estado: {{ order?.statusLabel }}
          </template>
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <!-- Order info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Order number -->
          <div class="bg-white rounded-2xl p-6 shadow-soft border border-cream-200">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm text-warm-500">Número de pedido</p>
                <p class="text-2xl font-bold text-warm-800">
                  {{ order?.orderNumber }}
                </p>
              </div>
              <span
                class="px-3 py-1 rounded-full text-sm font-medium"
                :class="[statusConfig.bg, statusConfig.color]"
              >
                {{ order?.statusLabel }}
              </span>
            </div>

            <div class="mt-4 pt-4 border-t border-cream-200">
              <p class="text-sm text-warm-500">Código de seguimiento</p>
              <div class="flex items-center gap-2 mt-1">
                <code class="text-sm bg-cream-100 px-3 py-1 rounded font-mono">
                  {{ trackingCode }}
                </code>
                <button
                  class="p-1.5 text-warm-400 hover:text-gold-500 transition-colors"
                  @click="copyTrackingCode"
                >
                  <Check v-if="copied" class="w-4 h-4 text-green-500" />
                  <Copy v-else class="w-4 h-4" />
                </button>
              </div>
              <p class="text-xs text-warm-400 mt-2">
                Guarda este código para consultar el estado de tu pedido
              </p>
            </div>

            <p class="text-sm text-warm-500 mt-4">
              Fecha: {{ formatDate(order?.createdAt || '') }}
            </p>
          </div>

          <!-- Payment instructions (only for pending) -->
          <div
            v-if="order?.status === 'PENDING'"
            class="bg-gold-50 rounded-2xl p-6 border-2 border-gold-200"
          >
            <h2 class="text-lg font-semibold text-warm-800 mb-4 flex items-center gap-2">
              <Smartphone class="w-5 h-5 text-gold-500" />
              Instrucciones de pago
            </h2>

            <div class="bg-white rounded-xl p-4">
              <p class="text-warm-700 mb-4">
                Para completar tu pedido, realiza el pago de
                <strong class="text-gold-600">{{ formatPrice(order?.total || 0) }}</strong>
                mediante uno de estos métodos:
              </p>

              <div class="space-y-4">
                <!-- Bizum -->
                <div class="flex items-start gap-3 p-3 bg-cream-50 rounded-lg">
                  <div class="w-10 h-10 rounded-full bg-[#00A3E0]/10 flex items-center justify-center flex-shrink-0">
                    <Smartphone class="w-5 h-5 text-[#00A3E0]" />
                  </div>
                  <div>
                    <p class="font-medium text-warm-800">Bizum</p>
                    <p class="text-sm text-warm-600">
                      Envía el importe al teléfono indicado con el concepto
                      <strong>{{ order?.orderNumber }}</strong>
                    </p>
                  </div>
                </div>

                <!-- Transfer -->
                <div class="flex items-start gap-3 p-3 bg-cream-50 rounded-lg">
                  <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Building class="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p class="font-medium text-warm-800">Transferencia bancaria</p>
                    <p class="text-sm text-warm-600">
                      Realiza una transferencia al IBAN indicado con el concepto
                      <strong>{{ order?.orderNumber }}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <p class="text-sm text-warm-500 mt-4">
                Te enviaremos un mensaje de confirmación una vez recibamos el pago.
              </p>
            </div>
          </div>

          <!-- Order items -->
          <div class="bg-white rounded-2xl p-6 shadow-soft border border-cream-200">
            <h2 class="text-lg font-semibold text-warm-800 mb-4">
              Productos del pedido
            </h2>

            <div class="space-y-3">
              <div
                v-for="(item, index) in order?.items"
                :key="index"
                class="flex justify-between py-3 border-b border-cream-200 last:border-0"
              >
                <div>
                  <p class="font-medium text-warm-800">
                    {{ item.productName }}
                  </p>
                  <p class="text-sm text-warm-500">
                    {{ item.quantity }} × {{ formatPrice(item.unitPrice) }}
                  </p>
                </div>
                <span class="font-semibold text-warm-800">
                  {{ formatPrice(item.subtotal) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl p-6 shadow-soft border border-cream-200 sticky top-24">
            <h2 class="text-lg font-semibold text-warm-800 mb-4">
              Resumen
            </h2>

            <div class="space-y-3 pb-4 border-b border-cream-200">
              <div class="flex justify-between text-warm-600">
                <span>Subtotal</span>
                <span>{{ formatPrice(order?.total || 0) }}</span>
              </div>
              <div class="flex justify-between text-warm-600">
                <span>Envío</span>
                <span class="text-sm">A calcular</span>
              </div>
            </div>

            <div class="flex justify-between items-center py-4">
              <span class="text-lg font-semibold text-warm-800">Total</span>
              <span class="text-2xl font-bold text-gold-600">
                {{ formatPrice(order?.total || 0) }}
              </span>
            </div>

            <NuxtLink
              to="/catalogo"
              class="block w-full btn-primary py-3 text-center mt-4"
            >
              Seguir comprando
            </NuxtLink>

            <button
              class="w-full text-warm-600 hover:text-gold-500 mt-4 transition-colors text-sm"
              @click="refresh()"
            >
              Actualizar estado
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
