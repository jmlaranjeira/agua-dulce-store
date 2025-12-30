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
  HelpCircle,
  Mail,
  Phone,
  MessageCircle,
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

// Copy functionality with multiple targets
const copiedField = ref<string | null>(null)
async function copyToClipboard(text: string, field: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedField.value = field
    setTimeout(() => {
      copiedField.value = null
    }, 2000)
  } catch {
    // Fallback silencioso
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

// WhatsApp link
const whatsappLink = computed(() => {
  if (!order.value?.contactInfo?.whatsapp) return null
  const phone = order.value.contactInfo.whatsapp
  const message = `Hola, tengo una consulta sobre mi pedido ${order.value.orderNumber}`
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
})
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
                <div class="flex items-center gap-2">
                  <p class="text-2xl font-bold text-warm-800">
                    {{ order?.orderNumber }}
                  </p>
                  <button
                    class="p-1.5 text-warm-400 hover:text-gold-500 transition-colors"
                    title="Copiar número de pedido"
                    @click="copyToClipboard(order?.orderNumber || '', 'orderNumber')"
                  >
                    <Check v-if="copiedField === 'orderNumber'" class="w-4 h-4 text-green-500" />
                    <Copy v-else class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <span
                class="px-3 py-1 rounded-full text-sm font-medium"
                :class="[statusConfig.bg, statusConfig.color]"
              >
                {{ order?.statusLabel }}
              </span>
            </div>

            <p class="text-sm text-warm-500 mt-4">
              Fecha: {{ formatDate(order?.createdAt || '') }}
            </p>
          </div>

          <!-- Payment instructions (only for pending) -->
          <div
            v-if="order?.status === 'PENDING' && order?.paymentInstructions"
            class="bg-gold-50 rounded-2xl p-6 border-2 border-gold-200"
          >
            <h2 class="text-lg font-semibold text-warm-800 mb-4">
              ¿Cómo realizar el pago?
            </h2>

            <p class="text-warm-700 mb-4">
              Realiza el pago de
              <strong class="text-gold-600">{{ formatPrice(order?.total || 0) }}</strong>
              mediante uno de estos métodos:
            </p>

            <div class="space-y-4">
              <!-- Bizum -->
              <div
                v-if="order?.paymentInstructions?.bizum"
                class="bg-white rounded-xl p-4 border border-cream-200"
              >
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-10 h-10 rounded-full bg-[#00A3E0]/10 flex items-center justify-center flex-shrink-0">
                    <Smartphone class="w-5 h-5 text-[#00A3E0]" />
                  </div>
                  <h3 class="font-semibold text-warm-800">Bizum</h3>
                </div>

                <ol class="text-sm text-warm-600 space-y-2 ml-1">
                  <li>1. Abre tu app de Bizum</li>
                  <li class="flex items-center gap-2">
                    2. Envía a:
                    <code class="bg-cream-100 px-2 py-0.5 rounded font-mono text-warm-800">
                      {{ order.paymentInstructions.bizum.phone }}
                    </code>
                    <button
                      class="p-1 text-warm-400 hover:text-gold-500 transition-colors"
                      title="Copiar teléfono"
                      @click="copyToClipboard(order.paymentInstructions.bizum.phone, 'bizumPhone')"
                    >
                      <Check v-if="copiedField === 'bizumPhone'" class="w-3.5 h-3.5 text-green-500" />
                      <Copy v-else class="w-3.5 h-3.5" />
                    </button>
                  </li>
                  <li>3. Importe: <strong class="text-gold-600">{{ formatPrice(order?.total || 0) }}</strong></li>
                  <li class="flex items-center gap-2">
                    4. Concepto:
                    <code class="bg-cream-100 px-2 py-0.5 rounded font-mono text-warm-800">
                      {{ order.paymentInstructions.bizum.concept }}
                    </code>
                    <button
                      class="p-1 text-warm-400 hover:text-gold-500 transition-colors"
                      title="Copiar concepto"
                      @click="copyToClipboard(order.paymentInstructions.bizum.concept, 'bizumConcept')"
                    >
                      <Check v-if="copiedField === 'bizumConcept'" class="w-3.5 h-3.5 text-green-500" />
                      <Copy v-else class="w-3.5 h-3.5" />
                    </button>
                  </li>
                </ol>
              </div>

              <!-- Transfer -->
              <div
                v-if="order?.paymentInstructions?.transfer"
                class="bg-white rounded-xl p-4 border border-cream-200"
              >
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Building class="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 class="font-semibold text-warm-800">Transferencia Bancaria</h3>
                </div>

                <div class="text-sm text-warm-600 space-y-3 ml-1">
                  <div class="flex items-start gap-2">
                    <span class="text-warm-500 min-w-[80px]">IBAN:</span>
                    <code class="bg-cream-100 px-2 py-0.5 rounded font-mono text-warm-800 break-all">
                      {{ order.paymentInstructions.transfer.iban }}
                    </code>
                    <button
                      class="p-1 text-warm-400 hover:text-gold-500 transition-colors flex-shrink-0"
                      title="Copiar IBAN"
                      @click="copyToClipboard(order.paymentInstructions.transfer.iban, 'iban')"
                    >
                      <Check v-if="copiedField === 'iban'" class="w-3.5 h-3.5 text-green-500" />
                      <Copy v-else class="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-warm-500 min-w-[80px]">Beneficiario:</span>
                    <span class="text-warm-800">{{ order.paymentInstructions.transfer.beneficiary }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-warm-500 min-w-[80px]">Importe:</span>
                    <strong class="text-gold-600">{{ formatPrice(order?.total || 0) }}</strong>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-warm-500 min-w-[80px]">Concepto:</span>
                    <code class="bg-cream-100 px-2 py-0.5 rounded font-mono text-warm-800">
                      {{ order.paymentInstructions.transfer.concept }}
                    </code>
                    <button
                      class="p-1 text-warm-400 hover:text-gold-500 transition-colors"
                      title="Copiar concepto"
                      @click="copyToClipboard(order.paymentInstructions.transfer.concept, 'transferConcept')"
                    >
                      <Check v-if="copiedField === 'transferConcept'" class="w-3.5 h-3.5 text-green-500" />
                      <Copy v-else class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Estimated times -->
            <div class="mt-4 pt-4 border-t border-gold-200 space-y-2 text-sm text-warm-600">
              <p class="flex items-center gap-2">
                <Clock class="w-4 h-4 text-gold-500" />
                Procesaremos tu pago en 24 horas
              </p>
              <p class="flex items-center gap-2">
                <Truck class="w-4 h-4 text-gold-500" />
                Tu pedido será enviado en 2-3 días laborables
              </p>
              <p class="flex items-center gap-2">
                <MessageCircle class="w-4 h-4 text-gold-500" />
                Recibirás confirmación por WhatsApp
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

          <!-- Support section -->
          <div
            v-if="order?.contactInfo"
            class="bg-white rounded-2xl p-6 shadow-soft border border-cream-200"
          >
            <h2 class="text-lg font-semibold text-warm-800 mb-4 flex items-center gap-2">
              <HelpCircle class="w-5 h-5 text-gold-500" />
              ¿Necesitas ayuda?
            </h2>

            <div class="space-y-3">
              <p class="text-sm text-warm-600">
                Si tienes alguna duda sobre tu pedido, contacta con nosotros:
              </p>

              <div class="flex flex-wrap gap-3">
                <a
                  v-if="whatsappLink"
                  :href="whatsappLink"
                  target="_blank"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20bd5a] transition-colors text-sm"
                >
                  <MessageCircle class="w-4 h-4" />
                  WhatsApp
                </a>

                <a
                  v-if="order.contactInfo.email"
                  :href="`mailto:${order.contactInfo.email}?subject=Consulta pedido ${order.orderNumber}`"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-cream-100 text-warm-700 rounded-lg hover:bg-cream-200 transition-colors text-sm"
                >
                  <Mail class="w-4 h-4" />
                  {{ order.contactInfo.email }}
                </a>

                <a
                  v-if="order.contactInfo.phone"
                  :href="`tel:${order.contactInfo.phone}`"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-cream-100 text-warm-700 rounded-lg hover:bg-cream-200 transition-colors text-sm"
                >
                  <Phone class="w-4 h-4" />
                  {{ order.contactInfo.phone }}
                </a>
              </div>

              <p class="text-xs text-warm-400 mt-2">
                Respondemos en menos de 24 horas
              </p>
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
                <span class="text-sm">Incluido</span>
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
