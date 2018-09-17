import { calculateTotal, formatToPrice } from '.';

test('Calculates the total of items', () => {
  const items = [
    {
      'unit-price': '4.99',
      quantity: 2
    },
    {
      'unit-price': '3.99',
      quantity: 1
    }
  ];
  expect(calculateTotal(items)).toBe(13.97);
});

test('Formats price', () => {
  expect(formatToPrice(3.9)).toBe('€3.90');
});
