/**
 * Priority queue implementation using internally resizing array. Requires comparator function to work correctly.
 * If queue is meant to be min-queue, then comparator should be implemented like this:
 * 
 * const comparator = (a, b) => {
 *  if (a > b) {
 *    return 1;
 *  } else if (a < b) {
 *    return -1;
 *  } else {
 *    return 0;
 *  }
 * };
 * 
 * or shorter:
 * 
 * const comparator = (a, b) => a - b;
 * 
 * If this queue is meant to be max-queue, then comparator should implemented like this:
 * 
 * const comparator = (a, b) => {
 *  if (a < b) {
 *    return 1;
 *  } else if (a > b) {
 *    return -1;
 *  } else {
 *    return 0;
 *  }
 * };
 * 
 * or shorter:
 * 
 * * const comparator = (a, b) => b - a;
 * 
 */
export class PriorityQueue {
  #ar = [, ];
  #comparator = null;
  #n = 1;

  set comparator(comp) {
    if (this.#n > 1) {
      throw 'Comparator should be applied only to empty queue';
    }
    this.#comparator = comp;
  }

  constructor(comp, values) {
    this.#comparator = comp;
    if (values) {
      this.#heapify(values);
    }
  }

  push(value) {
    if (!this.#comparator) {
      throw 'Priority queue elements comparator is not provided';
    }
    if (this.#n === this.#ar.length) {
      this.#resize(this.#n * 2);
    }
    this.#ar[this.#n] = value;
    this.#swim(this.#n++);
  }

  /**
   * Extracts and returns top element from priority queue.
   */
  pop() {
    if (!this.#comparator) {
      throw 'Priority queue elements comparator is not provided';
    }
    if (this.size() === 0) {
      throw 'Priority queue is empty';
    }
    const toReturn = this.#ar[1];
    this.#swap(1, --this.#n);
    this.#sink(1);
    if (this.#n === Math.floor(this.#ar.length / 4)) {
      this.#resize(Math.floor(this.#ar.length / 2));
    }
    return toReturn;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.#n - 1;
  }

  /**
   * Iterates over queue elements based on priority, meaning it will return ascending
   * array for min priority queue, descending array for max priority queue.
   * @returns 
   */
  [Symbol.iterator]() {
    return this.#createIterator();
  }

  #heapify(array) {
    if (array.length === 0) {
      return;
    }
    this.#ar = [...array, array[0]];
    this.#n = this.#ar.length;
    for (let i = Math.floor((this.#ar.length - 1) / 2); i >= 1; i--) {
      this.#sink(i);
    }
  }

  #sink(i) {
    while (i * 2 < this.#n) {
      let idx = i * 2;
      let childToSwap = this.#ar[idx];
      if ((idx + 1) < this.#n && this.#comparator(this.#ar[idx + 1], childToSwap) < 0) {
        childToSwap = this.#ar[++idx];
      }
      if (this.#comparator(childToSwap, this.#ar[i]) > 0) {
        break;
      }
      this.#swap(i, idx);
      i = idx;
    }
  }

  #swim(i) {
    while (i > 1 && this.#comparator(this.#ar[i], this.#ar[Math.floor(i / 2)]) < 0) {
      const idx = Math.floor(i / 2);
      this.#swap(i, idx);
      i = idx;
    }
  }

  #swap(i, j) {
    const temp = this.#ar[i];
    this.#ar[i] = this.#ar[j];
    this.#ar[j] = temp;
  }

  #resize(newLength) {
    if (newLength < this.#n) {
      throw `Reallocation goes out of borders: new length is ${newLength}, current length is ${this.#n}.`;
    }

    const newAr = new Array(newLength + 1);
    for (let i = 1; i < this.#n; i++) {
      newAr[i] = this.#ar[i];
    }
    this.#ar = newAr;
  }

  #createIterator() {
    const copyQueue = new PriorityQueue(this.#comparator, this.#ar.slice(1, this.#n));
    return {
      next() {
        if (copyQueue.size() !== 0) {
          return {
            done: false,
            value: copyQueue.pop()
          };
        } else {
          return {
            done: true
          };
        }
      }
    }
  }
}
