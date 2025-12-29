// write in a function thats a X by X array of arrays of numbers
// as well two x/y combinations and have it return the shortest
// length (you don't need to track the actual path) from point A
// to point B.
//
// the numbers in the maze array represent as follows:
// 0 – open space
// 1 - closed space, cannot pass through. a wall
// 2 - one of the two origination points

import { OPENED_BY } from "./constants";
import { logMaze } from "./logger";

type Coordinate = {
  closed: boolean;
  length: number;
  openedBy: OPENED_BY;
  x: number;
  y: number;
}

function generateVisited(
  maze
): Coordinate[][] {
  const visited = [];

  for (let y = 0; y < maze.length; y++) {
    const yAxis = [];
    for (let x = 0; x < maze[y].length; x++) {
      const coordinate = {
        closed: maze[y][x] === 1,
        length: 0,
        openedBy: OPENED_BY.NO_ONE,
        x,
        y
      };
      yAxis.push(coordinate);
    }
    visited.push(yAxis);
  }

  return visited;
}

function getNeighbors(visited: Coordinate[][], x: number, y: number): Coordinate[] {
  const neighbors = [];

  if (y - 1 >= 0 && !visited[y - 1][x].closed) {
    // up
    neighbors.push(visited[y - 1][x]);
  }

  if (y + 1 < visited[0].length && !visited[y + 1][x].closed) {
    // down
    neighbors.push(visited[y + 1][x]);
  }

  if (x - 1 >= 0 && !visited[y][x - 1].closed) {
    // left
    neighbors.push(visited[y][x - 1]);
  }

  if (x + 1 < visited.length && !visited[y][x + 1].closed) {
    // right
    neighbors.push(visited[y][x + 1]);
  }

  return neighbors;
}

export function findShortestPathLength(maze, [xA, yA], [xB, yB]) {
  const visited = generateVisited(maze);
  visited[yA][xA].openedBy = OPENED_BY.BY_A;
  visited[yB][xB].openedBy = OPENED_BY.BY_B;

  let aQueue = [visited[yA][xA]];
  let bQueue = [visited[yB][xB]];
  let iteration = 0;

  logMaze(visited);

  while (aQueue.length && bQueue.length) {
    iteration++;

    // gather A neighbors
    let aNeighbors: Coordinate[] = [];
    while (aQueue.length) {
      const coordinate = aQueue.shift();
      aNeighbors = aNeighbors.concat(getNeighbors(visited, coordinate.x, coordinate.y));
    }

    // process A neighbors
    for (let neighbor of aNeighbors) {
      if (neighbor.openedBy === OPENED_BY.BY_B) {
        logMaze(visited);
        return neighbor.length + iteration;
      }
      else if (neighbor.openedBy === OPENED_BY.NO_ONE) {
        neighbor.length = iteration;
        neighbor.openedBy = OPENED_BY.BY_A;
        aQueue.push(neighbor);
      }
    }

    // gather B neighbors
    let bNeighbors: Coordinate[] = [];
    while (bQueue.length) {
      const coordinate = bQueue.shift();
      bNeighbors = bNeighbors.concat(getNeighbors(visited, coordinate.x, coordinate.y));
    }

    // process B neighbors
    for (let neighbor of bNeighbors) {
      if (neighbor.openedBy === OPENED_BY.BY_A) {
        logMaze(visited);
        return neighbor.length + iteration;
      }
      else if (neighbor.openedBy === OPENED_BY.NO_ONE) {
        neighbor.length = iteration;
        neighbor.openedBy = OPENED_BY.BY_B;
        bQueue.push(neighbor);
      }
    }

    logMaze(visited);
  }

  return -1;
}

/*const fourByFour = [
  [2, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 2],
];
const value1 = findShortestPathLength(fourByFour, [0, 0], [3, 3]);
console.log("@@@ Output1: ", value1);

const sixBySix = [
  [0, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0],
];
const value2 = findShortestPathLength(sixBySix, [1, 1], [2, 5]);
console.log("@@@ Output2: ", value2);*/