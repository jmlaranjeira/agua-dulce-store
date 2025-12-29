import type { Product, CartItem } from '~/types'

const CART_STORAGE_KEY = 'agua-dulce-cart'

// Estado global del carrito (compartido entre componentes)
const cartItems = ref<CartItem[]>([])
const isCartOpen = ref(false)

export function useCart() {
  // Inicializar desde localStorage (solo en cliente)
  function initCart() {
    if (import.meta.client) {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        try {
          cartItems.value = JSON.parse(stored)
        } catch {
          cartItems.value = []
        }
      }
    }
  }

  // Guardar en localStorage
  function saveCart() {
    if (import.meta.client) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.value))
    }
  }

  // Añadir producto al carrito
  function addToCart(product: Product, quantity = 1) {
    const existingItem = cartItems.value.find(
      (item) => item.product.id === product.id
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.value.push({ product, quantity })
    }

    saveCart()
  }

  // Actualizar cantidad
  function updateQuantity(productId: string, quantity: number) {
    const item = cartItems.value.find((item) => item.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = Math.min(quantity, 99)
        saveCart()
      }
    }
  }

  // Eliminar producto
  function removeFromCart(productId: string) {
    cartItems.value = cartItems.value.filter(
      (item) => item.product.id !== productId
    )
    saveCart()
  }

  // Vaciar carrito
  function clearCart() {
    cartItems.value = []
    saveCart()
  }

  // Abrir/cerrar drawer
  function openCart() {
    isCartOpen.value = true
  }

  function closeCart() {
    isCartOpen.value = false
  }

  function toggleCart() {
    isCartOpen.value = !isCartOpen.value
  }

  // Computed: número total de items
  const itemCount = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  // Computed: total del carrito
  const cartTotal = computed(() =>
    cartItems.value.reduce(
      (sum, item) => sum + item.product.priceRetail * item.quantity,
      0
    )
  )

  // Computed: está vacío
  const isEmpty = computed(() => cartItems.value.length === 0)

  return {
    // Estado
    items: cartItems,
    isOpen: isCartOpen,

    // Acciones
    initCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
    toggleCart,

    // Computed
    itemCount,
    cartTotal,
    isEmpty,
  }
}
