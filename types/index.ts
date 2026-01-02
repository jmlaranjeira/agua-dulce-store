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

export type ProductCategory = 'earrings' | 'rings' | 'pendants' | 'charms'

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
    case 'CH':
      return 'charms'
    default:
      return null
  }
}

export const categoryLabels: Record<ProductCategory, string> = {
  earrings: 'Pendientes',
  rings: 'Anillos',
  pendants: 'Colgantes',
  charms: 'Charms',
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

// ============================================
// CART - Carrito de compras
// ============================================

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
}

// ============================================
// CHECKOUT - Datos de pedido
// ============================================

export type PaymentMethod = 'BIZUM' | 'TRANSFER' | 'CARD'

export const PAYMENT_METHODS = {
  BIZUM: 'BIZUM',
  TRANSFER: 'TRANSFER',
  CARD: 'CARD',
} as const

export interface ShippingData {
  name: string
  phone: string
  email?: string
  street: string
  city: string
  zip: string
}

export interface CreateOrderRequest {
  customerPhone: string
  customerName: string
  shippingName: string
  shippingPhone: string
  shippingEmail?: string
  shippingStreet: string
  shippingCity: string
  shippingZip: string
  paymentMethod: PaymentMethod
  items: { productId: string; quantity: number }[]
  notes?: string
}

export interface PaymentInstructions {
  method: PaymentMethod
  bizum?: { phone: string; concept: string }
  transfer?: { iban: string; beneficiary: string; concept: string }
}

export interface ContactInfo {
  email: string
  phone: string
  whatsapp: string
}

export interface OrderCreatedResponse {
  trackingCode: string
  orderNumber: string
  total: number
  paymentMethod: PaymentMethod
  paymentInstructions: PaymentInstructions | null
  contactInfo: ContactInfo
}

// ============================================
// STRIPE - Pagos con tarjeta
// ============================================

export interface StripeSessionResponse {
  sessionUrl: string
  trackingCode: string
  orderNumber: string
}

export interface OrderItemSummary {
  productName: string
  productImage: string | null
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface OrderStatusResponse {
  trackingCode: string
  orderNumber: string
  status: string
  statusLabel: string
  createdAt: string
  items: OrderItemSummary[]
  subtotal: number
  shippingPrice: number
  shippingWasFree: boolean
  shippingZoneName: string | null
  estimatedDaysMin: number | null
  estimatedDaysMax: number | null
  hasCustomsRisk: boolean
  total: number
  paymentMethod: PaymentMethod | null
  paymentInstructions: PaymentInstructions | null
  contactInfo: ContactInfo
}

// ============================================
// SHIPPING - Envíos
// ============================================

export interface ShippingZoneInfo {
  code: string
  name: string
}

export interface ShippingPriceInfo {
  price: number | null
  isFree: boolean
  freeAbove: number | null
  amountUntilFree: number | null
}

export interface DeliveryInfo {
  minDays: number | null
  maxDays: number | null
  message: string
}

export interface ShippingWarning {
  type: 'customs' | 'unknown_zone' | 'international_supplier'
  message: string
}

export interface ShippingCalculation {
  zone: ShippingZoneInfo | null
  shipping: ShippingPriceInfo
  delivery: DeliveryInfo
  warnings: ShippingWarning[]
}
