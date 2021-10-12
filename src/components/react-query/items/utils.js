export function filterByCategoryId(items, categoryId) {
  // eslint-disable-next-line array-callback-return
  return items
    .filter((item) => item.category === categoryId)
    .map((r) => {
      return { ...r };
    });
}
