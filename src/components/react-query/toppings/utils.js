export function filterById(toppings, id) {
  // eslint-disable-next-line array-callback-return
  return toppings
    .filter((rec) => rec.empid === id)
    .map((r) => {
      return { ...r };
    });
}
