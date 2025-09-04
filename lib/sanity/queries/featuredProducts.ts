// lib/sanity/queries/featuredProducts.ts
export const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && statusFlags.isFeatured == true && organization.category->slug.current == $categorySlug][0...$limit] {
  _id,
  basicInfo { name, slug { current }, sku },
  description,
  pricingStatus { price, originalPrice, stock, status },
  media { images[] { asset -> { url } } },
  specifications { material, dimensions, weight, colors },
  features,
  statusFlags { isNew, isOnSale, isFeatured, promotionText },
  rating { average, count },
  organization { category -> { name, slug { current } }, tags },
  seo { metaTitle, metaDescription }
}`;