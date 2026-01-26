export const toSlug = (v: string) =>
  v
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "")

export const sanitizeText = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.-]/g, "")

export const splitCollectionProduct = (input: string) => {
  const [collection, product] = input.split(" - ").map(part => part.trim().toLowerCase());
  return { collection, product };
}