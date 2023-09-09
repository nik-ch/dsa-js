import {PriorityQueue} from './priority-queue';

let pq;

describe('PriorityQueue', () => {
  beforeEach(() => {
    pq = new PriorityQueue((a, b) => a - b);
  });

  describe('comparator', () => {
    test('should throw if trying to set compartor on non empty queue', () => {
      pq.push(1);
      expect(() => {
        pq.comparator = (a, b) => b - a;
      }).toThrow();
    });

    test('should be used to compare values when manipulating with queue elements', () => {
      pq.comparator = (a, b) => b - a;

      pq.push(1);
      pq.push(2);
      pq.push(3);
      pq.push(4);
      pq.push(5);
      pq.push(6);

      expect(pq.pop()).toBe(6);
      expect(pq.pop()).toBe(5);
      expect(pq.pop()).toBe(4);

      pq.pop();
      pq.pop();
      pq.pop();

      pq.comparator = (a, b) => a.value - b.value;

      const val1 = {value: 1}, val2 = {value: 2}, val3 = {value: 3}, val4 = {value: 4}, val5 = {value: 5};
      pq.push(val5);
      pq.push(val4);
      pq.push(val3);
      pq.push(val2);
      pq.push(val1);

      expect(pq.pop()).toBe(val1);
      expect(pq.pop()).toBe(val2);
      expect(pq.pop()).toBe(val3);
    });
  });

  describe('push', () => {
    test('should throw if comparator is not defined', () => {
      pq.comparator = null;

      expect(() => pq.push(1)).toThrow();
    });

    test('should increase priority queue size', () => {
      expect(pq.size()).toBe(0);

      pq.push(1);
      pq.push(2);

      expect(pq.size()).toBe(2);
    });

    test('should not break internal array indexing after resizing', () => {
      pq.push(1);
      pq.push(2);
      pq.push(3);
      pq.push(4);
      pq.push(5);

      expect(pq.size()).toBe(5);

      pq.pop();
      pq.pop();
      pq.pop();
      pq.pop();

      expect(pq.size()).toBe(1);

      pq.push(5);
      pq.push(10);

      expect(pq.size()).toBe(3);
    });
  });

  describe('pop', () => {
    test('should throw if comparator is not defined', () => {
      pq.comparator = null;

      expect(() => pq.pop()).toThrow();
    });

    test('should throw if priority queue is empty', () => {
      expect(() => pq.pop()).toThrow();
    });

    test('should descrease priority queue size', () => {
      expect(pq.size()).toBe(0);

      pq.push(1);
      pq.push(2);
      pq.push(3);
      pq.push(4);
      pq.push(5);

      expect(pq.size()).toBe(5);

      pq.pop();
      pq.pop();
      pq.pop();
      pq.pop();

      expect(pq.size()).toBe(1);
    });
  });

  describe('iterator', () => {
    test('should return elements based on priority', () => {
      pq.push(1);
      pq.push(5);
      pq.push(10);

      let result = [];
      for (let val of pq) {
        result.push(val);
      }

      expect(result).toEqual([1, 5, 10]);

      pq.pop();
      pq.pop();
      pq.pop();

      pq.comparator = (a, b) => b - a;

      pq.push(1);
      pq.push(5);
      pq.push(10);

      result = [];
      for (let val of pq) {
        result.push(val);
      }

      expect(result).toEqual([10, 5, 1]);
    });

    test('should not modify internal array after iterating over it', () => {
      pq.push(1);
      pq.push(5);
      pq.push(10);

      let result = [];
      for (let val of pq) {
        result.push(val);
      }

      expect(pq.size()).toBe(3);
      expect(pq.pop()).toBe(1);
      expect(pq.pop()).toBe(5);
      expect(pq.pop()).toBe(10);
    });
  });

  describe('heapify', () => {
    test('should convert given array to priority queue', () => {
      const queue = new PriorityQueue((a, b) => a - b, [5, 4, 3, 2, 1]);
      expect(queue.size()).toBe(5);

      const result = [];
      while (queue.size() > 0) {
        result.push(queue.pop());
      }
      expect(result).toEqual([1, 2, 3, 4, 5]);
    })

    test('should convert given array to priority queue and work further with pushing and poping', () => {
      const queue = new PriorityQueue((a, b) => a - b, [5, 4, 3, 2, 1]);

      queue.push(6);
      queue.push(7);
      expect(queue.pop()).toBe(1);
      expect(queue.pop()).toBe(2);

      queue.pop();
      queue.pop();
      queue.pop();
      queue.pop();

      expect(queue.size()).toBe(1);

      queue.push(-5);
      expect(queue.size()).toBe(2);
      expect(queue.pop()).toBe(-5);
    });
  })
});
