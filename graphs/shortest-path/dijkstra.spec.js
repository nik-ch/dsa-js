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
      ['d', 'e', 5]
    ];
    const vertices = ['a', 'b', 'c', 'd', 'e'];
    const result = findShortestPaths(edges, 'a');

    expect(result.get('a')).toEqual({
      length: 0, previous: null
    });
    expect(result.get('b')).toEqual({
      length: 7, previous: 'c'
    });
    expect(result.get('c')).toEqual({
      length: 3, previous: 'a'
    });
    expect(result.get('d')).toEqual({
      length: 9, previous: 'b'
    });
    expect(result.get('e')).toEqual({
      length: 5, previous: 'c'
    });
  });
});
