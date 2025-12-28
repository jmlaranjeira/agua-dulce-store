import type { Product } from '~/types'

export function useWhatsApp() {
  const config = useRuntimeConfig()
  const phone = config.public.whatsappPhone

  function buildUrl(message: string): string {
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  }

  function openChat(message?: string): void {
    const text = message || '¡Hola! Me interesa información sobre vuestros productos.'
    const url = buildUrl(text)
    window.open(url, '_blank')
  }

  function askAboutProduct(product: Product): void {
    const message = `¡Hola! Me interesa el producto "${product.name}" (${product.code}) que vi en vuestra web. ¿Está disponible?`
    openChat(message)
  }

  function getProductMessage(product: Product): string {
    return `¡Hola! Me interesa el producto "${product.name}" (${product.code}) que vi en vuestra web. ¿Está disponible?`
  }

  function getProductUrl(product: Product): string {
    return buildUrl(getProductMessage(product))
  }

  return {
    openChat,
    askAboutProduct,
    getProductUrl,
    getProductMessage,
  }
}
