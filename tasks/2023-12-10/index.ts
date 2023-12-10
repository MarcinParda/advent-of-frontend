export function findCyclesBetweenLocations(
  graph: Record<string, string[]>
): string[][] {
  if (Object.keys(graph).length === 0) {
    throw new Error('Invalid graph: graph is empty');
  }
  const isAnyNodeEmpty = Object.values(graph).some(
    (locations) => locations.length === 0
  );
  if (!isAnyNodeEmpty) {
    throw new Error('Invalid graph: missing nodes');
  }

  const cycles: string[][] = [];
  const visitedNodes = new Set<string>();
  const nodesInCurrentPath = new Set<string>();

  const findCycles = (node: string) => {
    if (nodesInCurrentPath.has(node)) {
      cycles.push([...nodesInCurrentPath, node]);
      return;
    }
    if (visitedNodes.has(node)) {
      return;
    }
    visitedNodes.add(node);
    nodesInCurrentPath.add(node);
    graph[node].forEach(findCycles);
    nodesInCurrentPath.delete(node);
  };

  const firstLocation = Object.entries(graph)[0];

  if (firstLocation) {
    findCycles(firstLocation[0]);
  }

  return cycles;
}
