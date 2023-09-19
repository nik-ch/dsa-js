import {PriorityQueue} from '../../priority-queue/priority-queue';

/**
 * Builds MST for the given graph using Prim's algorithm.
 * Time complexity: O(E * log E), where E - number of edges.
 * Space complexity: O(E).
 * 
 * @param {*} vertices - list of all vertices in the graph.
 * @param {*} edges - list of edges and weights. Each item is [v1, v2, w], with v1 -> v2 edge with weight w.
 * @returns list of edges in MST.
 */
export const buildMst = (vertices, edges) => {
  const adjMap = new Map();
  for (const [source, dest, weight] of edges) {
    const valueSource = adjMap.get(source) || [];
    const valueDest = adjMap.get(dest) || [];
    valueSource.push([dest, weight]);
    valueDest.push([source, weight]);
    adjMap.set(source, valueSource);
    adjMap.set(dest, valueDest);
  }

  const visited = new Set();
  const edgesQueue = new PriorityQueue((edge1, edge2) => edge1[0] - edge2[0]);
  for (const [neighbor, weight] of adjMap.get(vertices[0])) {
    edgesQueue.push([weight, vertices[0], neighbor]);
  }
  visited.add(vertices[0]);
  const mst = [];
  while (!edgesQueue.isEmpty() && mst.length < vertices.length - 1) {
    const [, source, neighbor] = edgesQueue.pop();
    if (visited.has(neighbor)) {
      continue;
    }
    visited.add(neighbor);
    mst.push([source, neighbor]);

    if (!adjMap.has(neighbor)) {
      continue;
    }

    for (const [target, weight] of adjMap.get(neighbor)) {
      if (!visited.has(target)) {
        edgesQueue.push([weight, neighbor, target]);
      }
    }
  }

  return mst;
};
