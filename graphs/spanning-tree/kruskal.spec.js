import {buildMst} from './kruskal';

describe('Kruskal buildMst', () => {
  test('should return minimum spanning tree for given graph', () => {
    const vertices = [0, 1, 2, 3, 4, 5, 6, 7];
    const edges = [
      [4, 5, 0.35], [4, 7, 0.37], [4, 0, 0.38], [4, 6, 0.93],
      [5, 1, 0.32], [5, 7, 0.28], [7, 0, 0.16], [7, 2, 0.34],
      [7, 1, 0.19], [1, 2, 0.36], [1, 3, 0.29], [2, 3, 0.17],
      [0, 6, 0.58], [2, 6, 0.40], [3, 6, 0.52], [0, 2, 0.26]
    ];

    const mst = buildMst(vertices, edges);
    const expected = [
      [7, 0], [2, 3], [7, 1], [0, 2], [5, 7], [4, 5], [2, 6]
    ];

    expect(mst).toEqual(expected);
  });
});
