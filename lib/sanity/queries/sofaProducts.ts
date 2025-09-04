// lib/sanity/queries/sofaProducts.ts
export const SOFA_PRODUCTS_QUERY = `*[_type == "product" && organization.category->slug.current == "sofa"] {
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
  seo { metaTitle, metaDescription },
}`;