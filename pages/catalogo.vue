<script setup lang="ts">
import { Search, SlidersHorizontal, X } from 'lucide-vue-next'
import type { Product, ProductCategory, ProductFilters } from '~/types'
import { categoryLabels } from '~/types'

const { getProducts } = useProducts()

// SEO
useSeoMeta({
  title: 'Catálogo - Agua Dulce',
  description: 'Explora nuestra colección de joyería artesanal. Pendientes, anillos y colgantes únicos.',
  ogTitle: 'Catálogo - Agua Dulce',
  ogDescription: 'Explora nuestra colección de joyería artesanal. Pendientes, anillos y colgantes únicos.',
})

// Filters state
const filters = reactive<ProductFilters>({
  category: undefined,
  search: '',
  sortBy: 'newest',
})

const searchInput = ref('')
const showFilters = ref(false)

// Categories for filter
const categories: { value: ProductCategory | undefined; label: string }[] = [
  { value: undefined, label: 'Todas' },
  { value: 'earrings', label: categoryLabels.earrings },
  { value: 'rings', label: categoryLabels.rings },
  { value: 'pendants', label: categoryLabels.pendants },
]

// Sort options
const sortOptions: { value: ProductFilters['sortBy']; label: string }[] = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
]

// Fetch products with filters
const { data: products, status, refresh } = await useAsyncData<Product[]>(
  'catalog-products',
  () => getProducts(filters),
  {
    watch: [filters],
    default: () => [],
  }
)

// Debounced search
let searchTimeout: ReturnType<typeof setTimeout>
function handleSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    filters.search = searchInput.value || undefined
  }, 300)
}

function clearSearch() {
  searchInput.value = ''
  filters.search = undefined
}

function clearFilters() {
  filters.category = undefined
  filters.sortBy = 'newest'
  searchInput.value = ''
  filters.search = undefined
}

// Check if any filter is active
const hasActiveFilters = computed(() => {
  return filters.category || filters.search || filters.sortBy !== 'newest'
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <div class="bg-secondary-50 border-b border-secondary-100">
      <div class="container-app py-8 md:py-12">
        <h1 class="text-3xl md:text-4xl font-serif font-semibold text-secondary-900">
          Catálogo
        </h1>
        <p class="mt-2 text-secondary-600">
          Descubre todas nuestras piezas únicas
        </p>
      </div>
    </div>

    <div class="container-app py-8">
      <!-- Filters bar -->
      <div class="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <!-- Search -->
        <div class="relative flex-1 max-w-md">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
          <input
            v-model="searchInput"
            type="text"
            placeholder="Buscar productos..."
            class="w-full pl-10 pr-10 py-2.5 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            @input="handleSearch"
          >
          <button
            v-if="searchInput"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
            @click="clearSearch"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Mobile filter toggle -->
        <button
          class="md:hidden flex items-center gap-2 px-4 py-2.5 border border-secondary-200 rounded-lg text-secondary-600"
          @click="showFilters = !showFilters"
        >
          <SlidersHorizontal class="w-5 h-5" />
          Filtros
        </button>

        <!-- Desktop filters -->
        <div class="hidden md:flex items-center gap-4">
          <!-- Category -->
          <select
            v-model="filters.category"
            class="px-4 py-2.5 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option
              v-for="cat in categories"
              :key="cat.label"
              :value="cat.value"
            >
              {{ cat.label }}
            </option>
          </select>

          <!-- Sort -->
          <select
            v-model="filters.sortBy"
            class="px-4 py-2.5 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option
              v-for="opt in sortOptions"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </option>
          </select>

          <!-- Clear filters -->
          <button
            v-if="hasActiveFilters"
            class="text-sm text-primary-600 hover:text-primary-700 font-medium"
            @click="clearFilters"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      <!-- Mobile filters panel -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="showFilters"
          class="md:hidden mb-6 p-4 bg-secondary-50 rounded-xl space-y-4"
        >
          <!-- Category -->
          <div>
            <label class="block text-sm font-medium text-secondary-700 mb-2">
              Categoría
            </label>
            <select
              v-model="filters.category"
              class="w-full px-4 py-2.5 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option
                v-for="cat in categories"
                :key="cat.label"
                :value="cat.value"
              >
                {{ cat.label }}
              </option>
            </select>
          </div>

          <!-- Sort -->
          <div>
            <label class="block text-sm font-medium text-secondary-700 mb-2">
              Ordenar por
            </label>
            <select
              v-model="filters.sortBy"
              class="w-full px-4 py-2.5 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option
                v-for="opt in sortOptions"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
          </div>

          <!-- Clear -->
          <button
            v-if="hasActiveFilters"
            class="w-full py-2.5 text-sm text-primary-600 hover:text-primary-700 font-medium"
            @click="clearFilters"
          >
            Limpiar filtros
          </button>
        </div>
      </Transition>

      <!-- Results count -->
      <p v-if="products?.length" class="text-sm text-secondary-500 mb-6">
        {{ products.length }} producto{{ products.length !== 1 ? 's' : '' }}
      </p>

      <!-- Products grid -->
      <ProductGrid
        :products="products || []"
        :loading="status === 'pending'"
      />
    </div>
  </div>
</template>
