import { sum } from '../index';

describe('index', () => {
  test('sum', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
