/**
 * Detects connected components sets in the given graph.
 * 
 * Time complexity: O(V + E), V - number of vertices, E - number of edges.
 * Space complexity: O(V), V - number of vertices.
 * 
 * @param {*} edges 
 * @param {*} vertices 
 * @returns Map where each item is:
 *  key - vertex from the source graph.
 *  value - identifier of the component set (starting with 0).
 */
export const buildConnectedComponents = (edges, vertices) => {
  const adjacencyMap = new Map();
  edges.forEach(([from, to]) => {
    const valueFrom = adjacencyMap.has(from) ? adjacencyMap.get(from) : [];
    const valueTo = adjacencyMap.has(to) ? adjacencyMap.get(to) : [];
    valueFrom.push(to);
    valueTo.push(from);
    adjacencyMap.set(from, valueFrom);
    adjacencyMap.set(to, valueTo);
  });

  const marked = new Set();
  const result = new Map();
  let componentsSetId = 0;

  for (const v of vertices) {
    if (!marked.has(v)) {
      dfs(v, adjacencyMap, result, componentsSetId, marked);
      componentsSetId++;
    }
  }

  return result;
};

const dfs = (source, adjacencyMap, componentsMap, componentsSetId, marked) => {
  marked.add(source);
  componentsMap.set(source, componentsSetId);
  const neighbours = adjacencyMap.get(source);
  if (neighbours) {
    for (const n of neighbours) {
      if (!marked.has(n)) {
        dfs(n, adjacencyMap, componentsMap, componentsSetId, marked);
      }
    }
  }
};
