import type { Product, ProductFilters } from '~/types'

export function useProducts() {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl

  async function getProducts(filters?: ProductFilters): Promise<Product[]> {
    const params: Record<string, string> = {}

    if (filters?.category) {
      params.category = filters.category
    }
    if (filters?.search) {
      params.search = filters.search
    }
    if (filters?.sortBy) {
      params.sortBy = filters.sortBy
    }

    return await $fetch<Product[]>(`${apiUrl}/public/products`, {
      params,
    })
  }

  async function getProduct(code: string): Promise<Product> {
    return await $fetch<Product>(`${apiUrl}/public/products/${code}`)
  }

  async function getFeatured(): Promise<Product[]> {
    return await $fetch<Product[]>(`${apiUrl}/public/products/featured`)
  }

  return {
    getProducts,
    getProduct,
    getFeatured,
  }
}
