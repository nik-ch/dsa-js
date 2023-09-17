// case 1:  [[-8,14],[16,-18],[-19,-13],[-18,19],[20,20],[13,-20],[-15,9],[-4,-8]]
// case 2: [[-14,-14],[-18,5],[18,-10],[18,18],[10,-2]]

import {PriorityQueue} from '../../priority-queue/priority-queue';
import {UnionFind} from '../../union-find/union-find';

/**
 * 
 * @param {*} vertices 
 * @param {*} edges 
 */
export const buildMst = (vertices, edges) => {
  const pq = new PriorityQueue(([,, weight1], [,, weight2]) => weight1 - weight2, edges);
  const uf = new UnionFind(vertices);

  const mst = [];
  while (!pq.isEmpty() && mst.length < vertices.length - 1) {
    const [from, to] = pq.pop();
    if (uf.union(from, to)) {
      mst.push([from, to]);
    }
  }

  return mst;
};
