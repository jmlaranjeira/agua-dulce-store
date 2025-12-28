import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()

  try {
    const products = await $fetch<{ code: string }[]>(
      `${config.public.apiUrl}/public/products`
    )

    return products.map((product) => ({
      loc: `/producto/${product.code}`,
      changefreq: 'weekly',
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
    return []
  }
})
