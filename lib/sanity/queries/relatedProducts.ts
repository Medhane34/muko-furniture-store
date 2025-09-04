// lib/sanity/queries/relatedProducts.ts
export const RELATED_PRODUCTS_QUERY = `*[_type == "product" && !(_id in path("drafts.**")) && organization.category->slug.current == $categorySlug && basicInfo.slug.current != $currentProductSlug][0...$limit] {
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
