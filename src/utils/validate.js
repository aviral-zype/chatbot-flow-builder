export function validateIfConnected(nodes, edges) {
  const sourceNodesCount = edges.reduce((count, edge) => {
    if (!count.has(edge.source)) {
      count.set(edge.source, 1);
    } else {
      count.set(edge.source, count.get(edge.source) + 1);
    }
    return count;
  }, new Map());

  for (const [sourceNodeId, count] of sourceNodesCount) {
    if (count > 1) {
      return false;
    }
  }

  const allNodesIds = new Set(nodes.map((node) => node.id));
  const allSourceEdges = new Set(edges.map((edge) => edge.source));

  const unconnectedNodesCount = Array.from(allNodesIds).filter(
    (nodeId) => !allSourceEdges.has(nodeId)
  ).length;

  return unconnectedNodesCount < 2;
}
