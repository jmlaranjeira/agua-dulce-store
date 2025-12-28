<script setup lang="ts">
import { Instagram, Mail } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-secondary-50 border-t border-secondary-100">
    <div class="container-app py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand -->
        <div>
          <h3 class="font-serif text-xl font-semibold text-primary-700 mb-4">
            Agua Dulce
          </h3>
          <p class="text-secondary-600 text-sm leading-relaxed">
            Joyería artesanal única, hecha con amor y dedicación.
            Cada pieza cuenta una historia.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h4 class="font-semibold text-secondary-800 mb-4">Explorar</h4>
          <nav class="flex flex-col gap-2">
            <NuxtLink
              to="/"
              class="text-secondary-600 hover:text-primary-600 text-sm transition-colors"
            >
              Inicio
            </NuxtLink>
            <NuxtLink
              to="/catalogo"
              class="text-secondary-600 hover:text-primary-600 text-sm transition-colors"
            >
              Catálogo
            </NuxtLink>
          </nav>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-semibold text-secondary-800 mb-4">Contacto</h4>
          <div class="flex flex-col gap-3">
            <a
              href="https://instagram.com/aguadulce"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-secondary-600 hover:text-primary-600 text-sm transition-colors"
            >
              <Instagram class="w-4 h-4" />
              @aguadulce
            </a>
            <a
              href="mailto:hola@aguadulce.es"
              class="inline-flex items-center gap-2 text-secondary-600 hover:text-primary-600 text-sm transition-colors"
            >
              <Mail class="w-4 h-4" />
              hola@aguadulce.es
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 pt-8 border-t border-secondary-200">
        <p class="text-center text-secondary-500 text-sm">
          © {{ currentYear }} Agua Dulce. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>
