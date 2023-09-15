/**
 * Union find (disjoint set) data structure implementation. Allows to define in constant time
 * whether two nodes in given graph are connected (find operation is described by Inverse Ackermann
 * function, which reduces to constant time).
 * )
 */
export class UnionFind {
  #rank = new Map();
  #nodes = new Map();
  #componentsCount;

  constructor(vertices) {
    for (let v of vertices) {
      this.#nodes.set(v, v);
      this.#rank.set(v, 0);
    }
    this.#componentsCount = vertices.length;
  }

  get componentsCount() {
    return this.#componentsCount;
  }

  /**
   * @param {number} x
   * @return {number}
   */
  find(x) {
    let p = this.#nodes.get(x);
    while (p !== this.#nodes.get(p)) {
      // path compression
      this.#nodes.set(p, this.#nodes.get(this.#nodes.get(p)));
      p = this.#nodes.get(p);
    }
    return p;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @return {boolean}
   */
  isSameComponent(x, y) {
    return this.find(x) === this.find(y);
  }

  /**
   * @param {number} x
   * @param {number} y
   * @return {boolean}
   */
  union(x, y) {
    const p1 = this.find(x), p2 = this.find(y);
    if (p1 === p2) {
      return false;
    }
    // tree balancing
    const compareRes = this.#rank.get(p1) - this.#rank.get(p2);
    if (compareRes > 0) {
      this.#nodes.set(p2, p1);
    } else if (compareRes < 0) {
      this.#nodes.set(p1, p2);
    } else {
      this.#nodes.set(p2, p1);
      this.#rank.set(p1, this.#rank.get(p1) + 1);
    }
    this.#componentsCount--;
    return true;
  }
}
