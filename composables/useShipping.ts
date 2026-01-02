import type { ShippingCalculation } from '~/types'

export function useShipping() {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl

  /**
   * Calculate shipping for a postal code and subtotal
   */
  async function calculateShipping(
    postalCode: string,
    subtotal: number,
  ): Promise<ShippingCalculation> {
    return await $fetch<ShippingCalculation>(
      `${apiUrl}/public/shipping/calculate`,
      {
        params: {
          zip: postalCode,
          subtotal: subtotal.toString(),
        },
      },
    )
  }

  return { calculateShipping }
}
