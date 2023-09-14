import {UnionFind} from './union-find';

let uf;

describe('UnionFind', () => {
  beforeEach(() => {
    uf = new UnionFind([1, 2, 3, 4, 5]);
  });

  describe('find', () => {
    test('should return parent for the given node', () => {
      expect(uf.find(1)).toBe(1);

      uf.union(1, 3);
      expect(uf.find(3)).toBe(1);
    });
  });

  describe('isSameComponent', () => {
    test('should return true if nodes have the same parent, false otherwise', () => {
      expect(uf.isSameComponent(1, 3)).toBe(false);

      uf.union(1, 3);
      expect(uf.isSameComponent(1, 3)).toBe(true);
    });
  });

  describe('union', () => {
    test('should connect given nodes by settings the same parent for them', () => {
      uf.union(2, 5);
      uf.union(5, 3);
      const p1 = uf.find(5);
      const p2 = uf.find(3);
      expect(p1 === p2);
    });
  });

  describe('componentsCount', () => {
    test('should return number of different components', () => {
      expect(uf.componentsCount).toBe(5);

      uf.union(1, 2);
      uf.union(2, 3);
      expect(uf.componentsCount).toBe(3);
    });
  });
});