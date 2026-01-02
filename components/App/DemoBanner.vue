<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next'

const config = useRuntimeConfig()
const showBanner = computed(() => config.public.demoMode)
</script>

<template>
  <div
    v-if="showBanner"
    class="fixed top-0 left-0 right-0 z-50 bg-warm-800 border-b border-gold-500/30"
  >
    <div class="container-app py-2">
      <div class="flex items-center justify-center gap-2 text-center">
        <AlertTriangle class="w-4 h-4 text-gold-500 flex-shrink-0" />
        <p class="text-cream-100 text-xs sm:text-sm">
          <span class="font-medium text-gold-400">Sitio de demostración</span>
          <span class="hidden sm:inline"> — </span>
          <span class="block sm:inline">Los productos, precios y pagos NO son reales</span>
        </p>
      </div>
    </div>
  </div>
</template>
