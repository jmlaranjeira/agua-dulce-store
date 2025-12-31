import type { CreateOrderRequest, StripeSessionResponse } from '~/types'

export function usePayment() {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl

  /**
   * Crea una sesión de Stripe Checkout para pago con tarjeta.
   * Retorna la URL de Stripe a la que se debe redirigir al usuario.
   */
  async function createStripeSession(
    data: CreateOrderRequest,
  ): Promise<StripeSessionResponse> {
    // Excluir paymentMethod ya que es implícito (CARD)
    const { paymentMethod: _, ...stripeData } = data

    return await $fetch<StripeSessionResponse>(
      `${apiUrl}/public/payments/create-session`,
      {
        method: 'POST',
        body: stripeData,
      },
    )
  }

  return {
    createStripeSession,
  }
}
