import {PriorityQueue} from '../../priority-queue/priority-queue';

/**
 * Finds shortest paths from source to other vertices in a directed, weighted graph without negative weights (if such path exists).
 * 
 * Time complexity: O(E * log V), where V - number of vertices, E - number of edges.
 * Space complexity: O(V).
 * 
 * @param {*} edges - list of edges and weights. Each item is [v1, v2, w], with v1 -> v2 edge with weight w.
 * @param {*} vertices - list of all vertices in the graph.
 * @param {*} source - source vertex, where the search begins.
 * @returns Map where key is vertex from vertices list, value is: [previous node in the path, path length].
 */
export const findShortestPaths = (edges, source) => {
  const adjacencyMap = new Map();
  edges.forEach(([from, to, weight]) => {
    if (weight < 0) {
      throw 'Negative edge weights are not allowed';
    }
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

  const distances = new Map();
  while (pq.size() > 0) {
    const [pathLen, v, previous] = pq.pop();

    if (distances.has(v)) {
      continue;
    }

    distances.set(v, [previous, pathLen]);

    if (adjacencyMap.has(v)) {
      adjacencyMap.get(v).forEach(([neighbour, neighbourPath]) => {
        if (!distances.has(neighbour)) {
          pq.push([pathLen + neighbourPath, neighbour, v]);
        }
      })
    }
  }

  return distances;
}
