import {quickSort} from './quick-sort';

describe('quickSort', () => {
  test('should sort given array by ascending', () => {
    const ar = [10, 10, 9, 9, 8, 8, 7, 6, 5];
    quickSort(ar, (a, b) => a - b);
    expect(ar).toEqual([5, 6, 7, 8, 8, 9, 9, 10, 10]);

    const ar2 = [
      {val: 15}, {val: 10}, {val: 5}
    ];
    quickSort(ar2, (a, b) => a.val - b.val);
    expect(ar2).toEqual([
      {val: 5}, {val: 10}, {val: 15}
    ]);
  });

  test('should sort given array by descending', () => {
    const ar = [5, 5, 5, 6, 6, 7, 8, 9, 10, 10, 10];
    quickSort(ar, (a, b) => b - a);
    expect(ar).toEqual([10, 10, 10, 9, 8, 7, 6, 6, 5, 5, 5]);

    const ar2 = [
      {val: 5}, {val: 10}, {val: 15}
    ];
    quickSort(ar2, (a, b) => b.val - a.val);
    expect(ar2).toEqual([
      {val: 15}, {val: 10}, {val: 5}
    ]);
  });

  test('should work for empty array', () => {
    const ar = [];
    quickSort(ar, (a, b) => a - b);
    expect(ar).toEqual([]);

    quickSort(ar, (a, b) => b - a);
    expect(ar).toEqual([]);
  });

  test('should keep array with identical elements the same', () => {
    const ar = [1, 1, 1, 1];
    quickSort(ar, (a, b) => a - b);
    expect(ar).toEqual([1, 1, 1, 1]);

    quickSort(ar, (a, b) => b - a);
    expect(ar).toEqual([1, 1, 1, 1]);
  });
})

