/**
 * Stack implementation using internally resized array.
 */
export class Stack {
  #n = 0;
  #ar = [];

  push(val) {
    if (this.#n === this.#ar.length) {
      this.#reallocate(this.#n * 2 || 1);
    }
    this.#ar[this.#n++] = val;
  }

  pop() {
    if (this.#n === 0) {
      throw 'Stack is empty';
    }
    const value = this.#ar[--this.#n];
    if (this.#n > 0 && this.#n === Math.floor(this.#ar.length / 4)) {
      this.#reallocate(Math.floor(this.#ar.length / 2));
    }
    return value;
  }

  size() {
    return this.#n;
  }

  [Symbol.iterator]() {
    return this.#createIterator();
  }

  #reallocate(newLength) {
    if (newLength < this.#n) {
      throw `Reallocation goes out of borders: new length is ${newLength}, current length is ${this.#n}.`;
    }

    const newAr = new Array(newLength);
    for (let i = 0; i < this.#n; i++) {
      newAr[i] = this.#ar[i];
    }
    this.#ar = newAr;
  }

  #createIterator() {
    const arCopy = [...this.#ar];
    let i = this.#n - 1;
    return {
      next() {
        if (i >= 0) {
          return {
            done: false,
            value: arCopy[i--]
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
