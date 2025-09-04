// lib/sanity/queries/categoryQueries.ts
export const CATEGORY_HERO_QUERY = `*[_type == "category" && slug.current == $categorySlug][0] {
  name,
  slug { current },
  description,
  image { asset -> { url } },
  heroBadgeText,
  heroHeadline,
  heroSubheadline,
  heroCtaText,
  heroCtaLink,
  heroOverlayOpacity,
  heroContentWidth,
  heroMinHeight
}`;

export const CATEGORY_PRODUCTS_QUERY = `*[_type == "product" && !(_id in path("drafts.**")) && organization.category->slug.current == $categorySlug][0...$limit] {
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

export const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && !(_id in path("drafts.**")) && organization.category->slug.current == $categorySlug && statusFlags.isFeatured == true][0...$limit] {
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

export const SOCIAL_PROOF_QUERY = `*[_type == "socialProof" && category->slug.current == $categorySlug][0] {
  title,
  subtitle,
  items[] { value, label, prefix, suffix },
  layout,
  backgroundImage { asset -> { url } },
  overlayOpacity
}`;
