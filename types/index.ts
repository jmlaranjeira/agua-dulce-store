export interface Product {
  id: string
  code: string
  name: string
  priceRetail: number
  imageUrl?: string
  isActive: boolean
}

export interface ProductFilters {
  category?: ProductCategory
  search?: string
  sortBy?: 'price_asc' | 'price_desc' | 'newest'
}

export type ProductCategory = 'earrings' | 'rings' | 'pendants'

/**
 * Deriva la categoría del producto a partir del código
 * EA = Earrings (Pendientes)
 * RI = Rings (Anillos)
 * PE = Pendants (Colgantes)
 */
export function getCategoryFromCode(code: string): ProductCategory | null {
  const prefix = code.substring(0, 2).toUpperCase()
  switch (prefix) {
    case 'EA':
      return 'earrings'
    case 'RI':
      return 'rings'
    case 'PE':
      return 'pendants'
    default:
      return null
  }
}

export const categoryLabels: Record<ProductCategory, string> = {
  earrings: 'Pendientes',
  rings: 'Anillos',
  pendants: 'Colgantes',
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}
