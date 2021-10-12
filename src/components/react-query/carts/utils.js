export function filterByItemId(carts,id) {
  // eslint-disable-next-line array-callback-return
  return carts
    .filter((item) => item.id === id)
    .map((r) => {
      return { ...r };
    });
}
