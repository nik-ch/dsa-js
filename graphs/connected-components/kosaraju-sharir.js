
export const buildConnectedComponents = (edges, vertices) => {
  // building reverse post order for reversed graph
  const reversedEdges = edges.map(([from, to]) => [to, from]);
  const reversedAdjMap = buildAdjacencyMap(reversedEdges);
  const reversedPostOrder = buildReversePostorder(reversedAdjMap, vertices);

  // running postorder dfs in the original graph, considering previously computed order
  const adjMap = buildAdjacencyMap(edges);
  const strongComponents = buildComponents(reversedPostOrder, adjMap);

  return strongComponents;
};

const buildAdjacencyMap = (edges) => {
  const result = new Map();
  for (const [from, to] of edges) {
    const value = result.get(from) || [];
    value.push(to);
    result.set(from ,value);
  }
  return result;
};

const buildReversePostorder = (adjMap, vertices) => {
  const postorder = [];
  const marked = new Set();

  for (const v of vertices) {
    postOrderDfs(v, adjMap, marked, postorder);
  }

  postorder.reverse();
  return postorder;
};

const postOrderDfs = (source, adjMap, marked, postorder) => {
  if (marked.has(source)) {
    return;
  }
  marked.add(source);
  const neighbours = adjMap.get(source);
  if (neighbours) {
    for (const n of neighbours) {
      postOrderDfs(n, adjMap, marked, postorder);
    }
  }
  postorder.push(source);
  return;
};

const buildComponents = (vertices, adjMap) => {
  const marked = new Set();
  const result = new Map();
  let componentsSetId = 0;

  for (const v of vertices) {
    if (!marked.has(v)) {
      dfs(v, adjMap, result, componentsSetId, marked);
      componentsSetId++;
    }
  }

  return result;
};

const dfs = (source, adjMap, componentsMap, componentsSetId, marked) => {
  marked.add(source);
  componentsMap.set(source, componentsSetId);
  const neighbours = adjMap.get(source);
  if (neighbours) {
    for (const n of neighbours) {
      if (!marked.has(n)) {
        dfs(n, adjMap, componentsMap, componentsSetId, marked);
      }
    }
  }
};
