<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'

const { openChat } = useWhatsApp()
</script>

<template>
  <button
    class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20bd5a] transition-all duration-300 animate-pulse-soft"
    aria-label="Contactar por WhatsApp"
    @click="openChat()"
  >
    <MessageCircle class="w-7 h-7" />
  </button>
</template>
