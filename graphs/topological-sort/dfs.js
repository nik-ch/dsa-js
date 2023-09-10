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
  // filling adjacency map
  const adjMap = new Map();
  for (const [source, target] of edges) {
    const val = adjMap.get(source) || [];
    val.push(target);
    adjMap.set(source, val);
  }

  // we use this set to check if current node was already visited
  const visited = new Set();
  // we check this set to check for cycles
  const path = new Set();
  // stores result
  const order = [];

  vertices.forEach(v => {
    dfs(v, adjMap, path, visited, order);
  });

  order.reverse();
  return order;
};

// using post-order traversal to build order of vertices
const dfs = (source, adjMap, path, visited, order) => {
  if (path.has(source)) {
    throw 'Given graph has cycle';
  }

  if (visited.has(source)) {
    return;
  }

  path.add(source);

  const neighbours = adjMap.get(source);
  if (neighbours !== undefined) {
    for (const n of neighbours) {
      dfs(n, adjMap, path, visited, order);
    }
  }

  path.delete(source);
  visited.add(source);
  order.push(source);
};
