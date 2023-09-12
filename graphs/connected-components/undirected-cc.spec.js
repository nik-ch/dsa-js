import {buildConnectedComponents} from './undirected-cc';

describe('Undirected graph buildConnectedComponents', () => {
  test('should return map with connected components identifiers', () => {
    const edges = [
      ['a', 'b'], ['a', 'c'], ['a', 'e'],
      ['b', 'd'], ['b', 'f'], ['d', 'f'],
      ['h', 'i'], ['l', 'j'], ['j', 'k']
    ];
    const vertices = ['a', 'b', 'c', 'd', 'e', 'f', 'h', 'i', 'j', 'k', 'l'];

    const result = buildConnectedComponents(edges, vertices);
    const firstGroup = [
      result.get('a'), result.get('b'), result.get('c'),
      result.get('d'), result.get('e'), result.get('f'),
    ];
    const secondGroup = [result.get('h'), result.get('i')];
    const thirdGroup = [result.get('j'), result.get('l'), result.get('k')];

    expect(firstGroup).toEqual([0, 0, 0, 0, 0, 0]);
    expect(secondGroup).toEqual([1, 1]);
    expect(thirdGroup).toEqual([2, 2, 2]);
  });
});
