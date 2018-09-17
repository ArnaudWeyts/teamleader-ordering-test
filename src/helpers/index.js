export function calculateTotal(items) {
  return +items
    .reduce((a, b) => a + b['unit-price'] * b.quantity, 0)
    .toFixed(2);
}

export function formatToPrice(value) {
  return `€${value.toFixed(2)}`;
}
