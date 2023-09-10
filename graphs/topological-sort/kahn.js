import {Queue} from '../../queue/queue';

/**
 * Returns topological order for the given graph vertices and edges. Throws if there is a cycle in the graph.
 *
 * Time complexity: O(V + E), where V - number of all vertices in the graph, E - number of all edges.
 * Space complexity: O(V + E).
 * 
 * @param {*} vertices - full list of graph vertices.
 * @param {*} edges - list of edges, where each item is [source, target].
 * @returns List of vertices in topological order.
 */
export const topologicalSort = (vertices, edges) => {
  const adjMap = new Map();
  const indegrees = new Map();

  vertices.forEach(v => indegrees.set(v, 0));

  for (const [source, target] of edges) {
    // filling adjacency map
    const neighbours = adjMap.get(source) || [];
    neighbours.push(target);
    adjMap.set(source, neighbours);
    // filling indegrees
    indegrees.set(target, indegrees.get(target) + 1);
  }

  // queue holds nodes with 0 indegress
  const queue = new Queue();
  for (const [key, value] of indegrees.entries()) {
    if (value === 0) {
      queue.enqueue(key);
    }
  }

  const visited = new Set();
  const order = [];
  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    if (visited.has(node)) {
      return;
    }

    const neighbours = adjMap.get(node);
    if (neighbours !== undefined) {
      neighbours.forEach(n => {
        const indegree = indegrees.get(n) - 1;
        indegrees.set(n, indegree);
        if (indegree === 0) {
          queue.enqueue(n);
        }
      });
    }

    visited.add(node);
    order.push(node);
  }

  // if there were nodes that did not have 0 indegrees - graph has cycle
  if (visited.size !== vertices.length) {
    throw 'Given graph has cycle';
  }

  return order;
};
