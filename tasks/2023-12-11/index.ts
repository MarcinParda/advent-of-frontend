export interface WeightedGraph {
  [key: string]: { [key: string]: number };
}

export function findShortestPath(
  graph: WeightedGraph,
  startNode: string,
  endNode: string
): string[] | null {
  const startingCities = Object.keys(graph);
  const destinationCities: string[] = [];
  Object.values(graph).forEach((destionationPaths) =>
    destinationCities.push(...Object.keys(destionationPaths))
  );

  const noStartNodeInGraph = !startingCities.includes(startNode);
  const noEndNodeInGraph = !destinationCities.includes(endNode);
  if (noStartNodeInGraph || noEndNodeInGraph) {
    throw new Error('Invalid or non-existent route');
  }

  const paths: string[][] = [];
  const citiesInCurrentPath = new Set<string>();

  const findPaths = (startNode: string, endNode: string) => {
    if (citiesInCurrentPath.has(endNode)) {
      paths.push([...citiesInCurrentPath]);
      return;
    }
    if (citiesInCurrentPath.has(startNode)) {
      // city loop
      return;
    }

    citiesInCurrentPath.add(startNode);
    Object.keys(graph[startNode]).forEach((city) => findPaths(city, endNode));
    citiesInCurrentPath.delete(startNode);
  };

  findPaths(startNode, endNode);

  console.log(paths);

  if (paths.length === 0) {
    return null;
  }

  const pathDistances = paths.map((path) => {
    let distance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const startingCity = path[i];
      const destinationCity = path[i + 1];
      const distanceBetweenCities = graph[startingCity][destinationCity];
      distance += distanceBetweenCities;
    }
    return distance;
  });

  const minDistance = Math.min(...pathDistances);
  const indexOfMinDistance = pathDistances.indexOf(minDistance);
  return paths[indexOfMinDistance];
}
