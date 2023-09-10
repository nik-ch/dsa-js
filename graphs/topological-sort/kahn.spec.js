import {topologicalSort} from './kahn';

describe('Topological Sort Kahn', () => {
  test('should return vertices in topological order', () => {
    const vertices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const edges = [
      [1, 2], [1, 3],
      [2, 4], [3, 5],
      [4, 6], [5, 6],
      [9, 8]
    ];

    const result = topologicalSort(vertices, edges);
    const expected = [1, 7, 9, 2, 3, 8, 4, 5, 6];
    expect(result).toEqual(expected);
  });

  test('should throw error if cycle exists in graph', () => {
    expect(() => {
      const vertices = [1, 2, 3, 4, 5];
      const edges = [
        [1, 2], [1, 3],
        [2, 4], [3, 5],
        [4, 1]
      ];
      topologicalSort(vertices, edges);
    }).toThrow();
  });
});
