import {PriorityQueue} from '../../priority-queue/priority-queue';
import {UnionFind} from '../../union-find/union-find';

/**
 * Builds MST for the given graph using Kruskal's algorithm.
 * Time complexity: O(E * log E), where E - number of edges.
 * Space complexity: O(E).
 * 
 * @param {*} vertices - list of all vertices in the graph.
 * @param {*} edges - list of edges and weights. Each item is [v1, v2, w], with v1 -> v2 edge with weight w.
 * @returns list of edges in MST.
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
