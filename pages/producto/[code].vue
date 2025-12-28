<script setup lang="ts">
import {
  MessageCircle,
  Share2,
  Link2,
  ArrowLeft,
  Sparkles,
  Check,
  Truck,
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
  <div class="min-h-screen">
    <div class="container-app py-6 md:py-10">
      <!-- Back link -->
      <NuxtLink
        to="/catalogo"
        class="inline-flex items-center gap-2 text-warm-500 hover:text-gold-600 mb-8 transition-colors duration-300"
      >
        <ArrowLeft class="w-4 h-4" />
        Volver al catálogo
      </NuxtLink>

      <!-- Product detail -->
      <div class="grid md:grid-cols-2 gap-8 lg:gap-16">
        <!-- Image -->
        <div class="aspect-square bg-cream-100 rounded-2xl overflow-hidden shadow-soft">
          <img
            v-if="product?.imageUrl"
            :src="product.imageUrl"
            :alt="product.name"
            class="w-full h-full object-cover"
          >
          <div
            v-else
            class="w-full h-full flex items-center justify-center text-cream-300"
          >
            <Sparkles class="w-24 h-24" />
          </div>
        </div>

        <!-- Info -->
        <div class="flex flex-col">
          <!-- Category badge -->
          <span
            v-if="categoryLabel"
            class="inline-block self-start px-4 py-1.5 bg-gold-100 text-gold-700 text-sm font-medium rounded-full mb-4"
          >
            {{ categoryLabel }}
          </span>

          <!-- Name -->
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-warm-800">
            {{ product?.name }}
          </h1>

          <!-- Code -->
          <p class="mt-2 text-warm-400 text-sm">
            Ref: {{ product?.code }}
          </p>

          <!-- Price -->
          <p class="mt-6 text-3xl md:text-4xl font-semibold text-gold-500">
            {{ formatPrice(product?.priceRetail || 0) }}
          </p>

          <!-- WhatsApp CTA -->
          <button
            class="mt-8 btn-whatsapp text-lg py-4"
            @click="askAboutProduct(product!)"
          >
            <MessageCircle class="w-6 h-6" />
            Preguntar por WhatsApp
          </button>

          <!-- Share buttons -->
          <div class="mt-8 pt-8 border-t border-cream-200">
            <p class="text-sm font-medium text-warm-600 mb-4 flex items-center gap-2">
              <Share2 class="w-4 h-4" />
              Compartir
            </p>
            <div class="flex gap-3">
              <!-- WhatsApp share -->
              <button
                class="flex items-center gap-2 px-5 py-2.5 bg-[#25D366]/10 text-[#25D366] rounded-full hover:bg-[#25D366]/20 transition-all duration-300 text-sm font-medium"
                @click="shareWhatsApp"
              >
                <MessageCircle class="w-4 h-4" />
                WhatsApp
              </button>

              <!-- Copy link -->
              <button
                class="flex items-center gap-2 px-5 py-2.5 bg-cream-200 text-warm-600 rounded-full hover:bg-cream-300 transition-all duration-300 text-sm font-medium"
                @click="copyLink"
              >
                <Check v-if="copied" class="w-4 h-4 text-sage-500" />
                <Link2 v-else class="w-4 h-4" />
                {{ copied ? 'Copiado' : 'Copiar enlace' }}
              </button>
            </div>
          </div>

          <!-- Shipping info -->
          <div class="mt-auto pt-8">
            <div class="p-5 bg-cream-100 rounded-xl border border-cream-200">
              <div class="flex items-start gap-3">
                <Truck class="w-5 h-5 text-gold-500 mt-0.5" />
                <div>
                  <p class="font-medium text-warm-800">
                    Envío a toda España
                  </p>
                  <p class="text-sm text-warm-500 mt-1">
                    Contacta con nosotros para más información sobre disponibilidad y tiempos de entrega.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related products -->
      <section v-if="relatedProducts?.length" class="mt-20 md:mt-28">
        <div class="text-center mb-10">
          <h2 class="text-2xl md:text-3xl font-serif font-semibold text-warm-800">
            También te puede gustar
          </h2>
          <div class="divider-gold mx-auto mt-4" />
        </div>
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
