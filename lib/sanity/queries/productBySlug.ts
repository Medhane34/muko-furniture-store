// lib/sanity/queries/productBySlug.ts
export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && basicInfo.slug.current == $slug][0] {
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
