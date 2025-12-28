import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // Si el usuario usa el botón atrás/adelante, restaurar posición
    if (savedPosition) {
      return savedPosition
    }

    // Para navegación normal, ir al top
    return { top: 0, behavior: 'smooth' }
  },
}
