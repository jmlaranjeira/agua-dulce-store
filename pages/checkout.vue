<script setup lang="ts">
import { ArrowLeft, CreditCard, Smartphone, Building } from 'lucide-vue-next'
import { formatPrice } from '~/types'
import type { PaymentMethod, CreateOrderRequest } from '~/types'

const router = useRouter()
const { items, cartTotal, isEmpty, clearCart } = useCart()
const { createOrder } = useOrders()

// Redirect if cart is empty
if (isEmpty.value) {
  navigateTo('/carrito')
}

useSeoMeta({
  title: 'Checkout - Agua Dulce',
  description: 'Finaliza tu compra en Agua Dulce, joyería artesanal.',
})

// Form state
const form = reactive({
  name: '',
  phone: '',
  email: '',
  street: '',
  city: '',
  zip: '',
  notes: '',
  paymentMethod: 'BIZUM' as PaymentMethod,
})

const errors = reactive<Record<string, string>>({})
const isSubmitting = ref(false)
const submitError = ref('')

// Validate form
function validate(): boolean {
  // Clear previous errors
  Object.keys(errors).forEach((key) => delete errors[key])

  if (!form.name.trim()) {
    errors.name = 'El nombre es obligatorio'
  }

  if (!form.phone.trim()) {
    errors.phone = 'El teléfono es obligatorio'
  } else if (!/^[0-9+\s()-]{9,}$/.test(form.phone)) {
    errors.phone = 'Introduce un teléfono válido'
  }

  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Introduce un email válido'
  }

  if (!form.street.trim()) {
    errors.street = 'La dirección es obligatoria'
  }

  if (!form.city.trim()) {
    errors.city = 'La ciudad es obligatoria'
  }

  if (!form.zip.trim()) {
    errors.zip = 'El código postal es obligatorio'
  } else if (!/^\d{5}$/.test(form.zip)) {
    errors.zip = 'Introduce un código postal válido (5 dígitos)'
  }

  return Object.keys(errors).length === 0
}

// Submit order
async function submitOrder() {
  if (!validate()) return

  isSubmitting.value = true
  submitError.value = ''

  try {
    const orderData: CreateOrderRequest = {
      customerPhone: form.phone,
      customerName: form.name,
      shippingName: form.name,
      shippingPhone: form.phone,
      shippingEmail: form.email || undefined,
      shippingStreet: form.street,
      shippingCity: form.city,
      shippingZip: form.zip,
      paymentMethod: form.paymentMethod,
      items: items.value.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      notes: form.notes || undefined,
    }

    const result = await createOrder(orderData)

    // Clear cart and redirect to confirmation
    clearCart()
    router.push(`/pedido/${result.trackingCode}`)
  } catch (err) {
    submitError.value =
      err instanceof Error
        ? err.message
        : 'Error al procesar el pedido. Inténtalo de nuevo.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-cream-50">
    <div class="container-app py-6 md:py-10">
      <!-- Back link -->
      <NuxtLink
        to="/carrito"
        class="inline-flex items-center gap-2 text-warm-500 hover:text-gold-600 mb-8 transition-colors"
      >
        <ArrowLeft class="w-4 h-4" />
        Volver al carrito
      </NuxtLink>

      <h1 class="text-2xl md:text-3xl font-serif font-semibold text-warm-800 mb-8">
        Finalizar compra
      </h1>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Form -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Shipping info -->
          <div class="bg-white rounded-2xl p-6 shadow-soft border border-cream-200">
            <h2 class="text-lg font-semibold text-warm-800 mb-6">
              Datos de envío
            </h2>

            <div class="grid md:grid-cols-2 gap-4">
              <!-- Name -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-warm-700 mb-1">
                  Nombre completo *
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  class="input-field"
                  :class="{ 'border-red-500': errors.name }"
                  placeholder="María García"
                />
                <p v-if="errors.name" class="text-red-500 text-sm mt-1">
                  {{ errors.name }}
                </p>
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-sm font-medium text-warm-700 mb-1">
                  Teléfono *
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="input-field"
                  :class="{ 'border-red-500': errors.phone }"
                  placeholder="666 123 456"
                />
                <p v-if="errors.phone" class="text-red-500 text-sm mt-1">
                  {{ errors.phone }}
                </p>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-warm-700 mb-1">
                  Email (opcional)
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  class="input-field"
                  :class="{ 'border-red-500': errors.email }"
                  placeholder="maria@email.com"
                />
                <p v-if="errors.email" class="text-red-500 text-sm mt-1">
                  {{ errors.email }}
                </p>
              </div>

              <!-- Street -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-warm-700 mb-1">
                  Dirección *
                </label>
                <input
                  v-model="form.street"
                  type="text"
                  class="input-field"
                  :class="{ 'border-red-500': errors.street }"
                  placeholder="Calle Mayor 123, 2º B"
                />
                <p v-if="errors.street" class="text-red-500 text-sm mt-1">
                  {{ errors.street }}
                </p>
              </div>

              <!-- City -->
              <div>
                <label class="block text-sm font-medium text-warm-700 mb-1">
                  Ciudad *
                </label>
                <input
                  v-model="form.city"
                  type="text"
                  class="input-field"
                  :class="{ 'border-red-500': errors.city }"
                  placeholder="Madrid"
                />
                <p v-if="errors.city" class="text-red-500 text-sm mt-1">
                  {{ errors.city }}
                </p>
              </div>

              <!-- ZIP -->
              <div>
                <label class="block text-sm font-medium text-warm-700 mb-1">
                  Código postal *
                </label>
                <input
                  v-model="form.zip"
                  type="text"
                  class="input-field"
                  :class="{ 'border-red-500': errors.zip }"
                  placeholder="28001"
                  maxlength="5"
                />
                <p v-if="errors.zip" class="text-red-500 text-sm mt-1">
                  {{ errors.zip }}
                </p>
              </div>

              <!-- Notes -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-warm-700 mb-1">
                  Notas (opcional)
                </label>
                <textarea
                  v-model="form.notes"
                  class="input-field min-h-[100px]"
                  placeholder="Instrucciones especiales de entrega, etc."
                />
              </div>
            </div>
          </div>

          <!-- Payment method -->
          <div class="bg-white rounded-2xl p-6 shadow-soft border border-cream-200">
            <h2 class="text-lg font-semibold text-warm-800 mb-6">
              Método de pago
            </h2>

            <div class="space-y-3">
              <!-- Bizum -->
              <label
                class="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all"
                :class="
                  form.paymentMethod === 'BIZUM'
                    ? 'border-gold-500 bg-gold-50'
                    : 'border-cream-200 hover:border-cream-300'
                "
              >
                <input
                  v-model="form.paymentMethod"
                  type="radio"
                  value="BIZUM"
                  class="sr-only"
                />
                <div
                  class="w-12 h-12 rounded-full flex items-center justify-center"
                  :class="
                    form.paymentMethod === 'BIZUM'
                      ? 'bg-gold-500 text-white'
                      : 'bg-cream-100 text-warm-500'
                  "
                >
                  <Smartphone class="w-6 h-6" />
                </div>
                <div>
                  <p class="font-medium text-warm-800">Bizum</p>
                  <p class="text-sm text-warm-500">
                    Pago rápido desde tu móvil
                  </p>
                </div>
              </label>

              <!-- Transfer -->
              <label
                class="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all"
                :class="
                  form.paymentMethod === 'TRANSFER'
                    ? 'border-gold-500 bg-gold-50'
                    : 'border-cream-200 hover:border-cream-300'
                "
              >
                <input
                  v-model="form.paymentMethod"
                  type="radio"
                  value="TRANSFER"
                  class="sr-only"
                />
                <div
                  class="w-12 h-12 rounded-full flex items-center justify-center"
                  :class="
                    form.paymentMethod === 'TRANSFER'
                      ? 'bg-gold-500 text-white'
                      : 'bg-cream-100 text-warm-500'
                  "
                >
                  <Building class="w-6 h-6" />
                </div>
                <div>
                  <p class="font-medium text-warm-800">Transferencia bancaria</p>
                  <p class="text-sm text-warm-500">
                    Transferencia a nuestra cuenta
                  </p>
                </div>
              </label>
            </div>

            <p class="text-sm text-warm-500 mt-4">
              Recibirás las instrucciones de pago una vez confirmes el pedido.
            </p>
          </div>
        </div>

        <!-- Order summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl p-6 shadow-soft border border-cream-200 sticky top-24">
            <h2 class="text-lg font-semibold text-warm-800 mb-4">
              Tu pedido
            </h2>

            <!-- Items -->
            <div class="space-y-3 pb-4 border-b border-cream-200">
              <div
                v-for="item in items"
                :key="item.product.id"
                class="flex justify-between text-sm"
              >
                <span class="text-warm-600">
                  {{ item.product.name }}
                  <span class="text-warm-400">× {{ item.quantity }}</span>
                </span>
                <span class="font-medium text-warm-800">
                  {{ formatPrice(item.product.priceRetail * item.quantity) }}
                </span>
              </div>
            </div>

            <!-- Totals -->
            <div class="space-y-3 py-4 border-b border-cream-200">
              <div class="flex justify-between text-warm-600">
                <span>Subtotal</span>
                <span>{{ formatPrice(cartTotal) }}</span>
              </div>
              <div class="flex justify-between text-warm-600">
                <span>Envío</span>
                <span class="text-sm">A calcular</span>
              </div>
            </div>

            <div class="flex justify-between items-center py-4">
              <span class="text-lg font-semibold text-warm-800">Total</span>
              <span class="text-2xl font-bold text-gold-600">
                {{ formatPrice(cartTotal) }}
              </span>
            </div>

            <!-- Error message -->
            <p v-if="submitError" class="text-red-500 text-sm mb-4">
              {{ submitError }}
            </p>

            <!-- Submit button -->
            <button
              class="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="isSubmitting"
              @click="submitOrder"
            >
              {{ isSubmitting ? 'Procesando...' : 'Confirmar pedido' }}
            </button>

            <p class="text-xs text-warm-500 mt-4 text-center">
              Al confirmar, aceptas nuestras condiciones de venta
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
