<script setup lang="ts">
// Inicializar carrito desde localStorage
const { initCart } = useCart()

onMounted(() => {
  initCart()
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />

    <main class="flex-1">
      <NuxtPage />
    </main>

    <AppFooter />

    <ClientOnly>
      <AppWhatsAppButton />
      <CartDrawer />
    </ClientOnly>
  </div>
</template>
