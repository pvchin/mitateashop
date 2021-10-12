export function filterById(toppings, id) {
  // eslint-disable-next-line array-callback-return
  return toppings
    .filter((rec) => rec.id === id)
    .map((r) => {
      return { ...r };
    });
}
