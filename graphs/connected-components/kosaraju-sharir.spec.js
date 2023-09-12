import {buildConnectedComponents} from './kosaraju-sharir';

describe('Kosaraju-Sharir buildConnectedComponents', () => {
  test('should return map with connected components identifiers', () => {
    const vertices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const edges = [
      [0, 5], [0, 1], [3, 5], [3, 2],
      [2, 3], [2, 0], [5, 4], [4, 3],
      [4, 2], [6, 0], [6, 8], [8, 6],
      [6, 4], [6, 9], [11, 4], [11, 12],
      [10, 12], [9, 11], [9, 10], [12, 9],
      [7, 9], [7, 6]
    ];
    const strongComponents = buildConnectedComponents(edges, vertices);

    const firstGroup = [strongComponents.get(1)];
    const secondGroup = [
      strongComponents.get(0), strongComponents.get(2), strongComponents.get(3),
      strongComponents.get(4), strongComponents.get(5)
    ];
    const thirdGroup = [
      strongComponents.get(9), strongComponents.get(10),
      strongComponents.get(11), strongComponents.get(12)
    ];
    const fourthGroup = [
      strongComponents.get(6), strongComponents.get(8),
    ];
    const fifthGroup = [strongComponents.get(7)];

    expect(firstGroup).toEqual([0]);
    expect(secondGroup).toEqual([1, 1, 1, 1, 1]);
    expect(thirdGroup).toEqual([2, 2, 2, 2]);
    expect(fourthGroup).toEqual([3, 3]);
    expect(fifthGroup).toEqual([4]);
  });
});
