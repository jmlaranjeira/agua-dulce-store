<script setup lang="ts">
import {
  MessageCircle,
  Share2,
  Link2,
  ArrowLeft,
  Sparkles,
  Check,
} from 'lucide-vue-next'
import { formatPrice, getCategoryFromCode, categoryLabels } from '~/types'
import type { Product } from '~/types'

const route = useRoute()
const config = useRuntimeConfig()
const { getProduct, getProducts } = useProducts()
const { askAboutProduct, getProductUrl } = useWhatsApp()

const code = route.params.code as string

// Fetch product
const { data: product, error } = await useAsyncData<Product>(
  `product-${code}`,
  () => getProduct(code)
)

// Handle 404
if (error.value || !product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Producto no encontrado',
  })
}

// SEO
useSeoMeta({
  title: () => `${product.value?.name} - Agua Dulce`,
  description: () => `${product.value?.name}. Joyería artesanal única. ${formatPrice(product.value?.priceRetail || 0)}`,
  ogTitle: () => `${product.value?.name} - Agua Dulce`,
  ogDescription: () => `${product.value?.name}. Joyería artesanal única.`,
  ogImage: () => product.value?.imageUrl || '',
  ogType: 'product',
})

// Get category label
const categoryLabel = computed(() => {
  const cat = getCategoryFromCode(product.value?.code || '')
  return cat ? categoryLabels[cat] : null
})

// Related products (same category)
const { data: relatedProducts } = await useAsyncData<Product[]>(
  `related-${code}`,
  async () => {
    const cat = getCategoryFromCode(code)
    if (!cat) return []
    const products = await getProducts({ category: cat })
    return products.filter((p) => p.code !== code).slice(0, 4)
  },
  { default: () => [] }
)

// Share functionality
const copied = ref(false)
const productUrl = computed(() => `${config.public.siteUrl}/producto/${code}`)

async function copyLink() {
  try {
    await navigator.clipboard.writeText(productUrl.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // Fallback for older browsers
    const input = document.createElement('input')
    input.value = productUrl.value
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

function shareWhatsApp() {
  const text = `Mira este producto de Agua Dulce: ${product.value?.name} - ${productUrl.value}`
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="container-app py-6 md:py-10">
      <!-- Back link -->
      <NuxtLink
        to="/catalogo"
        class="inline-flex items-center gap-2 text-secondary-600 hover:text-primary-600 mb-6 transition-colors"
      >
        <ArrowLeft class="w-4 h-4" />
        Volver al catálogo
      </NuxtLink>

      <!-- Product detail -->
      <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
        <!-- Image -->
        <div class="aspect-square bg-secondary-50 rounded-2xl overflow-hidden">
          <img
            v-if="product?.imageUrl"
            :src="product.imageUrl"
            :alt="product.name"
            class="w-full h-full object-cover"
          >
          <div
            v-else
            class="w-full h-full flex items-center justify-center text-secondary-200"
          >
            <Sparkles class="w-24 h-24" />
          </div>
        </div>

        <!-- Info -->
        <div class="flex flex-col">
          <!-- Category badge -->
          <span
            v-if="categoryLabel"
            class="inline-block self-start px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full mb-4"
          >
            {{ categoryLabel }}
          </span>

          <!-- Name -->
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-secondary-900">
            {{ product?.name }}
          </h1>

          <!-- Code -->
          <p class="mt-2 text-secondary-500">
            Ref: {{ product?.code }}
          </p>

          <!-- Price -->
          <p class="mt-4 text-3xl font-semibold text-primary-600">
            {{ formatPrice(product?.priceRetail || 0) }}
          </p>

          <!-- WhatsApp CTA -->
          <button
            class="mt-8 btn-whatsapp text-lg"
            @click="askAboutProduct(product!)"
          >
            <MessageCircle class="w-6 h-6" />
            Preguntar por WhatsApp
          </button>

          <!-- Share buttons -->
          <div class="mt-6 pt-6 border-t border-secondary-100">
            <p class="text-sm font-medium text-secondary-700 mb-3 flex items-center gap-2">
              <Share2 class="w-4 h-4" />
              Compartir
            </p>
            <div class="flex gap-3">
              <!-- WhatsApp share -->
              <button
                class="flex items-center gap-2 px-4 py-2 bg-[#25D366]/10 text-[#25D366] rounded-lg hover:bg-[#25D366]/20 transition-colors text-sm font-medium"
                @click="shareWhatsApp"
              >
                <MessageCircle class="w-4 h-4" />
                WhatsApp
              </button>

              <!-- Copy link -->
              <button
                class="flex items-center gap-2 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors text-sm font-medium"
                @click="copyLink"
              >
                <Check v-if="copied" class="w-4 h-4 text-green-600" />
                <Link2 v-else class="w-4 h-4" />
                {{ copied ? 'Copiado' : 'Copiar enlace' }}
              </button>
            </div>
          </div>

          <!-- Additional info -->
          <div class="mt-auto pt-8">
            <div class="p-4 bg-secondary-50 rounded-xl">
              <p class="text-sm text-secondary-600">
                <strong class="text-secondary-800">Envío a toda España.</strong>
                Contacta con nosotros para más información sobre disponibilidad y tiempos de entrega.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Related products -->
      <section v-if="relatedProducts?.length" class="mt-16 md:mt-24">
        <h2 class="text-2xl md:text-3xl font-serif font-semibold text-secondary-900 mb-8">
          También te puede gustar
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <ProductCard
            v-for="related in relatedProducts"
            :key="related.id"
            :product="related"
          />
        </div>
      </section>
    </div>
  </div>
</template>
