<script setup lang="ts">
import { Instagram, Mail, MapPin } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-warm-800 text-cream-200">
    <div class="container-app py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Brand -->
        <div>
          <h3 class="font-serif text-2xl font-semibold text-white mb-4">
            Agua Dulce
          </h3>
          <p class="text-cream-300 text-sm leading-relaxed mb-6">
            Joyería artesanal única, hecha con amor y dedicación.
            Cada pieza cuenta una historia especial.
          </p>
          <!-- Social Icons -->
          <div class="flex gap-4">
            <a
              href="https://instagram.com/aguadulce"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-warm-700 text-cream-300 hover:bg-gold-500 hover:text-white transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram class="w-5 h-5" />
            </a>
            <a
              href="https://tiktok.com/@aguadulce"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-warm-700 text-cream-300 hover:bg-gold-500 hover:text-white transition-all duration-300"
              aria-label="TikTok"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Links -->
        <div>
          <h4 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            Explorar
          </h4>
          <nav class="flex flex-col gap-3">
            <NuxtLink
              to="/"
              class="text-cream-300 hover:text-gold-400 text-sm transition-colors duration-300"
            >
              Inicio
            </NuxtLink>
            <NuxtLink
              to="/catalogo"
              class="text-cream-300 hover:text-gold-400 text-sm transition-colors duration-300"
            >
              Catálogo
            </NuxtLink>
          </nav>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            Legal
          </h4>
          <nav class="flex flex-col gap-3">
            <NuxtLink
              to="/legal/privacidad"
              class="text-cream-300 hover:text-gold-400 text-sm transition-colors duration-300"
            >
              Política de privacidad
            </NuxtLink>
            <NuxtLink
              to="/legal/condiciones"
              class="text-cream-300 hover:text-gold-400 text-sm transition-colors duration-300"
            >
              Condiciones de venta
            </NuxtLink>
            <NuxtLink
              to="/legal/cookies"
              class="text-cream-300 hover:text-gold-400 text-sm transition-colors duration-300"
            >
              Política de cookies
            </NuxtLink>
          </nav>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            Contacto
          </h4>
          <div class="flex flex-col gap-3">
            <a
              href="https://instagram.com/aguadulce"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-3 text-cream-300 hover:text-gold-400 text-sm transition-colors duration-300"
            >
              <Instagram class="w-4 h-4" />
              @aguadulce
            </a>
            <a
              href="mailto:hola@aguadulce.es"
              class="inline-flex items-center gap-3 text-cream-300 hover:text-gold-400 text-sm transition-colors duration-300"
            >
              <Mail class="w-4 h-4" />
              hola@aguadulce.es
            </a>
            <span class="inline-flex items-center gap-3 text-cream-300 text-sm">
              <MapPin class="w-4 h-4" />
              España
            </span>
          </div>
        </div>
      </div>

      <!-- Divider & Copyright -->
      <div class="mt-12 pt-8 border-t border-warm-700">
        <p class="text-center text-cream-400 text-sm">
          © {{ currentYear }} Agua Dulce. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>
