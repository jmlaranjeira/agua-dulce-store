<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'

const isMenuOpen = ref(false)

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
</script>

<template>
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-secondary-100">
    <div class="container-app">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2" @click="closeMenu">
          <span class="font-serif text-xl md:text-2xl font-semibold text-primary-700">
            Agua Dulce
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            class="text-secondary-600 hover:text-primary-600 font-medium transition-colors"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 text-secondary-600 hover:text-primary-600"
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
        <nav v-if="isMenuOpen" class="md:hidden py-4 border-t border-secondary-100">
          <div class="flex flex-col gap-2">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.href"
              :to="link.href"
              class="px-4 py-3 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors"
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
