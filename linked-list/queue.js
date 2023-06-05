class Node {
  value;
  next;

  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

/**
 * Queue implementation using linked list.
 */
class Queue {
  #first = null;
  #last = null;
  #n = 0;

  enqueue(val) {
    const n = new Node(val);
    const oldLast = this.#last;
    this.#last = n;
    if (oldLast) {
      oldLast.next = n;
    } else {
      this.#first = n;
    }
    this.#n++;
  }

  dequeue() {
    if (this.size() === 0) {
      throw 'Queue is empty';
    }
    const oldFirst = this.#first;
    this.#first = oldFirst.next;
    this.#n--;
    if (this.size() === 0) {
      this.#last = null;
    }
    return oldFirst;
  }

  size() {
    return this.#n;
  }
}
