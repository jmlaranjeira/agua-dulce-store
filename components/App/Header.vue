<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Catálogo', href: '/catalogo' },
]

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

// Detect scroll for shadow
onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 10
  }
  window.addEventListener('scroll', handleScroll)
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})
</script>

<template>
  <header
    class="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b transition-all duration-300"
    :class="isScrolled ? 'border-cream-200 shadow-soft' : 'border-transparent'"
  >
    <div class="container-app">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2" @click="closeMenu">
          <span class="font-serif text-2xl md:text-3xl font-semibold text-warm-800 tracking-tight">
            Agua Dulce
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            class="text-warm-600 hover:text-gold-500 font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 text-warm-600 hover:text-gold-500 transition-colors"
          aria-label="Menú"
          @click="toggleMenu"
        >
          <Menu v-if="!isMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <nav v-if="isMenuOpen" class="md:hidden py-4 border-t border-cream-200">
          <div class="flex flex-col gap-1">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.href"
              :to="link.href"
              class="px-4 py-3 text-warm-600 hover:text-gold-500 hover:bg-cream-100 rounded-lg font-medium transition-all duration-300"
              @click="closeMenu"
            >
              {{ link.name }}
            </NuxtLink>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>
