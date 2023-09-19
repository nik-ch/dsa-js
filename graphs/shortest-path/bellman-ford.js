/**
 * Finds shortest paths from source to other vertices in a directed, weighted graph.
 * Detects if there is a negative path cycle in the graph.
 * 
 * Time complexity: O(V * E), where V - number of vertices, E - number of edges.
 * Space comlpexity: 
 * 
 * @param {*} edges - list of edges and weights. Each item is [v1, v2, w], with v1 -> v2 edge with weight w.
 * @param {*} vertices - list of all vertices in the graph.
 * @returns object with properties:
 *  distances - map where key is the node for which path is counted, values is [previousNode, lengthOfPath]
 *  hasNegativeWeightCycle - if graph has negative path cycles.
 */
export const findShortestPaths = (edges, vertices, source) => {
  // stores distances in form [previousNode, lengthOfPath]
  const distances = new Map();
  for (const v of vertices) {
    distances.set(v, v === source ? [null, 0] : [source, Number.POSITIVE_INFINITY]);
  }

  for (const _ of vertices) {
    let updatedNodes = 0;

    for (const [source, to, weight] of edges) {
      const [, sourceDistance] = distances.get(source);
      const [, toDistance] = distances.get(to);
      if (toDistance > sourceDistance + weight) {
        // if old distance to the 'n' node is bigger than distance to the 'source'
        // node + weight between 'source' -> 'node', then we update distances map
        distances.set(to, [source, sourceDistance + weight]);
        updatedNodes++;
      }
    }

    // if no distances were updated during last iteration - break the cycle, because
    // further iterations would not shorten distances
    if (updatedNodes === 0) {
      break;
    }
  }

  // detecting negative weight cycles in the graph - if after one more run through the edges
  // we can reduce edge weight - then we have negative weight cycle
  let hasNegativeWeightCycle = false;
  for (const [source, to, weight] of edges) {
    const [, sourceDistance] = distances.get(source);
    const [, toDistance] = distances.get(to);
    if (toDistance !== Number.POSITIVE_INFINITY && toDistance > sourceDistance + weight) {
      hasNegativeWeightCycle = true;
      break;
    }
  }

  return {
    distances,
    hasNegativeWeightCycle
  }
};
