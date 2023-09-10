import {PriorityQueue} from '../../priority-queue/priority-queue';

/**
 * Finds shortest paths from source to other vertices in a directed, weighted graph without negative weights (if such path exists).
 * 
 * Time complexity: let V be number of vertices, E - number of edges.
 * Building adjacency map takes O(E) time. Poping and adding to PQ takes O(E * log E) time for all edges in the graph. So the final time is O(E * log E)
 * (not counting time to build result path for each node here).
 * 
 * Space complexity: O(E).
 * 
 * @param {*} edges - list of edges and weights. Each item is [v1, v2, w], with v1 -> v2 edge with weight w.
 * @param {*} source - source vertex, where the search begins.
 * @returns Map where key is vertex from vertices list, value is following object:
 * {
 *   length, // the shortest path's length
 *   previous // previous element in the path (null for source element)
 * }
 */
export const findShortestPaths = (edges, source) => {
  const adjacencyMap = new Map();
  edges.forEach(([from, to, weight]) => {
    const value = adjacencyMap.has(from) ? adjacencyMap.get(from) : [];
    value.push([to, weight]);
    adjacencyMap.set(from, value);
  });

  const pq = new PriorityQueue((a, b) => a[0] - b[0]);
  // Priority queue stores arrays with following values:
  // first element - current path length
  // second element - node for which path is counted
  // third element - previous element in the path
  pq.push([0, source, null]);

  const result = new Map();
  while (pq.size() > 0) {
    const [pathLen, v, previous] = pq.pop();

    if (result.has(v)) {
      continue;
    }

    result.set(v, {
      length: pathLen,
      previous
    });

    if (adjacencyMap.has(v)) {
      adjacencyMap.get(v).forEach(([neighbour, neighbourPath]) => {
        if (!result.has(neighbour)) {
          pq.push([pathLen + neighbourPath, neighbour, v]);
        }
      })
    }
  }

  return result;
}
