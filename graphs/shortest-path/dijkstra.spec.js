import {findShortestPaths} from './dijkstra';

describe('Dijkstra findShortestPaths', () => {
  test('should return dictionary with shortest paths from source node to all the others', () => {
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
      length: 0, path: ['a']
    });
    expect(result.get('b')).toEqual({
      length: 7, path: ['a', 'c', 'b']
    });
    expect(result.get('c')).toEqual({
      length: 3, path: ['a', 'c']
    });
    expect(result.get('d')).toEqual({
      length: 9, path: ['a', 'c', 'b', 'd']
    });
    expect(result.get('e')).toEqual({
      length: 5, path: ['a', 'c', 'e']
    });
  });
});
