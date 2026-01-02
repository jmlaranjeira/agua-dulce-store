<script setup lang="ts">
// Inicializar carrito desde localStorage
const { initCart } = useCart()
const config = useRuntimeConfig()
const demoMode = computed(() => config.public.demoMode)

onMounted(() => {
  initCart()
})
</script>

<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden">
    <AppDemoBanner />
    <AppHeader :demo-mode="demoMode" />

    <main class="flex-1">
      <NuxtPage />
    </main>

    <AppFooter />

    <ClientOnly>
      <AppWhatsAppButton />
      <CartDrawer />
      <AppCookieBanner />
    </ClientOnly>
  </div>
</template>
