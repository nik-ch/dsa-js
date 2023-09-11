import {findShortestPaths} from './bellman-ford';

describe('Bellman-Ford findShortestPath', () => {
  test('should return shortest distances from source to other nodes in graph', () => {
    const edges = [
      ['a', 'b', 10],
      ['a', 'c', 3],
      ['b', 'd', 2],
      ['c', 'b', 4],
      ['c', 'd', -2],
      ['c', 'e', 2],
      ['d', 'e', 1],
      ['y', 'z', 1]
    ];
    const vertices = ['a', 'b', 'c', 'd', 'e', 'y', 'z'];
    const result = findShortestPaths(edges, vertices, 'a');
    const distances = result.distances;

    expect(distances.get('a')).toEqual([null, 0]);
    expect(distances.get('b')).toEqual(['c', 7]);
    expect(distances.get('c')).toEqual(['a', 3]);
    expect(distances.get('d')).toEqual(['c', 1]);
    expect(distances.get('e')).toEqual(['d', 2]);
    expect(distances.get('y')).toEqual(['a', Number.POSITIVE_INFINITY]);
    expect(distances.get('z')).toEqual(['a', Number.POSITIVE_INFINITY]);
  });

  test('should determine negative path cycles in the graph', () => {
    const edges = [
      ['a', 'b', 10],
      ['a', 'c', 3],
      ['b', 'd', 2],
      ['c', 'b', 4],
      ['c', 'd', -2],
      ['e', 'c', -2],
      ['c', 'e', 2],
      ['d', 'e', 1],
    ];
    const vertices = ['a', 'b', 'c', 'd', 'e'];
    const result = findShortestPaths(edges, vertices, 'a');
    expect(result.hasNegativeWeightCycle).toBe(true);
  });
});
