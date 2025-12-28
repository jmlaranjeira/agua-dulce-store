import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // Si el usuario usa el botón atrás/adelante, restaurar posición
    if (savedPosition) {
      return savedPosition
    }

    // Esperar a que la página esté lista antes de hacer scroll
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ top: 0, left: 0, behavior: 'smooth' })
      }, 100)
    })
  },
}
