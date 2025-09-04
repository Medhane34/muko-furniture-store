// lib/sanity/queries/socialProof.ts
export const SOCIAL_PROOF_QUERY = `*[_type == "socialProof" && category->slug.current == $categorySlug][0] {
  title,
  subtitle,
  items[] { value, label, prefix, suffix },
  layout,
  backgroundImage { asset -> { url } },
  overlayOpacity
}`;