<script setup lang="ts">
import { X } from 'lucide-vue-next'

const COOKIE_CONSENT_KEY = 'agua-dulce-cookie-consent'

const showBanner = ref(false)

onMounted(() => {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
  if (!consent) {
    showBanner.value = true
  }
})

function acceptCookies() {
  localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
  showBanner.value = false
}

function rejectCookies() {
  localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected')
  showBanner.value = false
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="showBanner"
      class="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
    >
      <div class="max-w-4xl mx-auto bg-warm-800 rounded-2xl shadow-lg border border-warm-700 p-4 md:p-6">
        <div class="flex flex-col md:flex-row md:items-center gap-4">
          <div class="flex-1">
            <p class="text-cream-200 text-sm md:text-base">
              Utilizamos cookies propias para el funcionamiento de la tienda y de terceros (Stripe) para procesar pagos de forma segura.
              <NuxtLink
                to="/legal/cookies"
                class="text-gold-400 hover:text-gold-300 underline"
              >
                Más información
              </NuxtLink>
            </p>
          </div>
          <div class="flex items-center gap-3">
            <button
              class="px-4 py-2 text-sm text-cream-300 hover:text-white transition-colors"
              @click="rejectCookies"
            >
              Rechazar
            </button>
            <button
              class="px-5 py-2 bg-gold-500 hover:bg-gold-600 text-white text-sm font-medium rounded-lg transition-colors"
              @click="acceptCookies"
            >
              Aceptar
            </button>
          </div>
          <button
            class="absolute top-3 right-3 md:hidden text-cream-400 hover:text-white"
            aria-label="Cerrar"
            @click="rejectCookies"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
