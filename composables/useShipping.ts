import type { ShippingCalculation } from '~/types'

export function useShipping() {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl

  /**
   * Calculate shipping for a postal code and subtotal
   * Optionally accepts productIds to check stock and adjust delivery times
   */
  async function calculateShipping(
    postalCode: string,
    subtotal: number,
    productIds?: string[],
  ): Promise<ShippingCalculation> {
    const params: Record<string, string> = {
      zip: postalCode,
      subtotal: subtotal.toString(),
    }

    if (productIds && productIds.length > 0) {
      params.productIds = productIds.join(',')
    }

    return await $fetch<ShippingCalculation>(
      `${apiUrl}/public/shipping/calculate`,
      { params },
    )
  }

  return { calculateShipping }
}
