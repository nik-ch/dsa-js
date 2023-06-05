class Node {
  value;
  next;

  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

/**
 * Stack implementation using linked list.
 */
class Stack {
  #first = null;
  #n = 0;

  push(val) {
    const oldFirst = this.#first;
    this.#first = new Node(val);
    this.#first.next = oldFirst;
    this.#n++;
  }

  pop() {
    if (!this.#first) {
      throw 'Stack is empty';
    }
    const oldFirst = this.#first;
    this.#first = this.#first.next;
    this.#n--;
    return oldFirst;
  }

  size() {
    return this.#n;
  }
}
