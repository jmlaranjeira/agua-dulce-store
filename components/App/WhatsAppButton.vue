<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'

const { openChat } = useWhatsApp()
</script>

<template>
  <button
    class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20bd5a] hover:scale-110 active:scale-100 transition-all duration-200"
    aria-label="Contactar por WhatsApp"
    @click="openChat()"
  >
    <MessageCircle class="w-7 h-7" />
  </button>
</template>
