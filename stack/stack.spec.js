import {Stack} from './stack';

let s;

describe('Stack', () => {
  beforeEach(() => {
    s = new Stack();
  });

  describe('push', () => {
    test('should increase size of stack', () => {
      expect(s.size()).toBe(0);

      s.push(1);
      s.push(2);
      s.push(3);
      expect(s.size()).toBe(3);
    });

    test('should not break internal array indexing after resizing', () => {
      s.push(1);
      s.push(2);
      s.push(3);
      s.push(4);
      s.push(5);
      expect(s.size()).toBe(5);

      s.pop();
      s.pop();
      s.pop();
      s.pop();
      s.pop();
      expect(s.size()).toBe(0);

      s.push(1);
      s.push(2);
      s.push(3);
      expect(s.size()).toBe(3);
    });
  });

  describe('pop', () => {
    test('should decrease size of stack', () => {
      expect(s.size()).toBe(0);

      s.push(1);
      s.push(2);
      s.push(3);
      expect(s.size()).toBe(3);

      s.pop();
      s.pop();
      expect(s.size()).toBe(1);
    });

    test('should pop elements in LIFO order', () => {
      s.push(1);
      s.push(2);
      s.push(3);

      const result = [s.pop(), s.pop(), s.pop()];
      const expected = [3, 2, 1];
      expect(result).toEqual(expected);
    });

    test('should throw is stack is empty', () => {
      expect(() => {
        s.pop();
      }).toThrow();
    });
  });

  describe('iterator', () => {
    test('should iterate over stack in LIFO order', () => {
      s.push(1);
      s.push(2);
      s.push(3);

      const result = [];
      for (let v of s) {
        result.push(v);
      }

      const expected = [3, 2, 1];
      expect(result).toEqual(expected);
    });

    test('should not modify internal stack array', () => {
      s.push(1);
      s.push(2);
      s.push(3);

      const result = [];
      for (let v of s) {
        result.push(v);
      }

      expect(s.size()).toBe(3);
      expect(s.pop()).toBe(3);
    });
  });
});
