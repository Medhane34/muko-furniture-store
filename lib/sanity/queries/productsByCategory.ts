// lib/sanity/queries/productsByCategory.ts
export const PRODUCTS_BY_CATEGORY_QUERY = `*[_type == "product" && organization.category->slug.current == $categorySlug] {
  _id,
  basicInfo { name, slug { current }, sku },
  description,
  pricingStatus { price, originalPrice, stock, status },
  media { images[] { asset -> { url } } },
  specifications { material, dimensions, weight, colors },
  features,
  statusFlags { isNew, isOnSale, isFeatured, promotionText },
  reviews[] { rating, comment, user, date },
  organization { category -> { name, slug { current } }, tags },
  seo { metaTitle, metaDescription },
  "rating": { "average": math::avg(reviews.rating), "count": count(reviews) }
}`;
