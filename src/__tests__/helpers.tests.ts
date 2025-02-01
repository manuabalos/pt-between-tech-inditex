import { generateRandomPrice } from '../utils/helpers';

describe('generateRandomPrice', () => {
  it('debería generar un precio entre 5 y 50', () => {
    const price = generateRandomPrice();
    expect(price).toBeGreaterThanOrEqual(5);
    expect(price).toBeLessThanOrEqual(50);
  });

  it('debería generar un precio con dos decimales', () => {
    const price = generateRandomPrice();
    expect(price).toBeCloseTo(parseFloat(price.toFixed(2)), 2);
  });
});