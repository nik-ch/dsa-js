import {Queue} from './queue';

let q;

describe('Queue', () => {
  beforeEach(() => {
    q = new Queue();
  });

  describe('enqueue', () => {
    test('should increase queue size', () => {
      expect(q.size()).toBe(0);

      q.enqueue(1);
      q.enqueue(2);
      q.enqueue(3);
      expect(q.size()).toBe(3);
    });

    test('should not break internal array indexing after resizing', () => {
      q.enqueue(1);
      q.enqueue(2);
      q.enqueue(3);
      q.enqueue(4);
      q.enqueue(5);
      expect(q.size()).toBe(5);

      q.dequeue();
      q.dequeue();
      q.dequeue();
      q.dequeue();
      q.dequeue();
      expect(q.size()).toBe(0);

      q.enqueue(1);
      q.enqueue(2);
      q.enqueue(3);
      expect(q.size()).toBe(3);
    });
  });

  describe('dequeue', () => {
    test('should decrease size of queue', () => {
      expect(q.size()).toBe(0);

      q.enqueue(1);
      q.enqueue(2);
      q.enqueue(3);
      expect(q.size()).toBe(3);

      q.dequeue();
      q.dequeue();
      expect(q.size()).toBe(1);
    });

    test('should pop elements in FIFO order', () => {
      q.enqueue(1);
      q.enqueue(2);
      q.enqueue(3);

      const result = [q.dequeue(), q.dequeue(), q.dequeue()];
      expect(result).toEqual([1, 2, 3]);
    });

    test('should throw is queue is empty', () => {
      expect(() => {
        q.dequeue();
      }).toThrow();
    });
  });

  describe('iterator', () => {
    test('should iterate over queue in FIFO order', () => {
      q.enqueue(3);
      q.enqueue(2);
      q.enqueue(1);

      const result = [];
      for (let v of q) {
        result.push(v);
      }
      expect(result).toEqual([3, 2, 1]);
    });

    test('should not modify internal array after iterating over it', () => {
      q.enqueue(1);
      q.enqueue(2);
      q.enqueue(3);

      const result = [];
      for (let v of q) {
        result.push(v);
      }

      expect(q.size()).toBe(3);
      expect(q.dequeue()).toBe(1);
    });
  });

  describe('isEmpty', () => {
    test('should return true if queue is empty, false otherwise', () => {
      expect(q.isEmpty()).toBe(true);
      q.enqueue(1);
      expect(q.isEmpty()).toBe(false);
    });
  });
});
