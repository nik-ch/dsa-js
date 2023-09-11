import {findShortestPaths} from './dijkstra';

describe('Dijkstra findShortestPaths', () => {
  test('should return dictionary with shortest paths lengths from source node to all the others', () => {
    const edges = [
      ['a', 'b', 10],
      ['a', 'c', 3],
      ['b', 'd', 2],
      ['c', 'b', 4],
      ['c', 'd', 8],
      ['c', 'e', 2],
      ['d', 'e', 5],
      ['y', 'z', 1]
    ];
    const vertices = ['a', 'b', 'c', 'd', 'e', 'y', 'z'];
    const result = findShortestPaths(edges, 'a');

    expect(result.get('a')).toEqual([null, 0]);
    expect(result.get('b')).toEqual(['c', 7]);
    expect(result.get('c')).toEqual(['a', 3]);
    expect(result.get('d')).toEqual(['b', 9]);
    expect(result.get('e')).toEqual(['c', 5]);
    expect(result.get('y')).toEqual(undefined);
    expect(result.get('z')).toEqual(undefined);
  });

  test('should throw if negative edge weight is given', () => {
    expect(() => {
      const edges = [
        ['a', 'b', 10],
        ['a', 'c', -3],
        ['b', 'd', 2],
        ['c', 'b', 4],
      ];
      findShortestPaths(edges, 'a');
    }).toThrow();
  });
});
