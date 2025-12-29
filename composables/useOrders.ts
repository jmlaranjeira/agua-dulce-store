import type {
  CreateOrderRequest,
  OrderCreatedResponse,
  OrderStatusResponse,
} from '~/types'

export function useOrders() {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl

  async function createOrder(
    data: CreateOrderRequest
  ): Promise<OrderCreatedResponse> {
    return await $fetch<OrderCreatedResponse>(`${apiUrl}/public/orders`, {
      method: 'POST',
      body: data,
    })
  }

  async function getOrderStatus(
    trackingCode: string
  ): Promise<OrderStatusResponse> {
    return await $fetch<OrderStatusResponse>(
      `${apiUrl}/public/orders/${trackingCode}`
    )
  }

  return {
    createOrder,
    getOrderStatus,
  }
}
