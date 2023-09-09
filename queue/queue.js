/**
 * Queue implementation using internally resized array.
 */
export class Queue {
  #ar = [];
  #n = 0;
  #first = 0;

  enqueue(val) {
    if (this.#n === this.#ar.length) {
      this.#reallocate(this.#n * 2 || 1);
    }
    this.#ar[this.#n++] = val;
  }

  dequeue() {
    if (this.size() === 0) {
      throw 'Queue is empty';
    }
    const result = this.#ar[this.#first++];
    if (this.size() === Math.floor(this.#ar.length / 4)) {
      this.#reallocate(Math.floor(this.#ar.length / 2));
    }
    return result;
  }

  size() {
    return this.#n - this.#first;
  }

  [Symbol.iterator]() {
    return this.#createIterator();
  }

  #reallocate(newLength) {
    if (newLength < this.size()) {
      throw `Reallocation goes out of borders: new length is ${newLength}, current length is ${this.size()}.`;
    }

    const newAr = new Array(newLength);
    for (let i = this.#first, j = 0; i < this.#n; i++, j++) {
      newAr[j] = this.#ar[i];
    }
    this.#ar = newAr;
    const n = this.size();
    this.#first = 0;
    this.#n = n;
  }

  #createIterator() {
    const arCopy = [...this.#ar];
    const len = this.#n;
    let i = this.#first;
    return {
      next() {
        if (i < len) {
          return {
            done: false,
            value: arCopy[i++]
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
