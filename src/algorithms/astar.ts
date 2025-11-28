import { Cell } from '../types/grid';

class PriorityQueue<T> {
  private items: { element: T; priority: number }[] = [];

  enqueue(element: T, priority: number) {
    const item = { element, priority };
    let added = false;

    for (let i = 0; i < this.items.length; i++) {
      if (item.priority < this.items[i].priority) {
        this.items.splice(i, 0, item);
        added = true;
        break;
      }
    }

    if (!added) {
      this.items.push(item);
    }
  }

  dequeue(): T | undefined {
    return this.items.shift()?.element;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

function manhattanDistance(a: Cell, b: Cell): number {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function aStar(
  grid: Cell[][],
  start: Cell,
  end: Cell
): { path: Cell[]; visited: Cell[] } {
  const rows = grid.length;
  const cols = grid[0].length;
  const visitedCells: Cell[] = [];
  const visited = new Set<string>();
  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();
  const cameFrom = new Map<string, Cell>();
  const pq = new PriorityQueue<Cell>();

  const startKey = `${start.row},${start.col}`;
  gScore.set(startKey, 0);
  fScore.set(startKey, manhattanDistance(start, end));
  pq.enqueue(start, fScore.get(startKey)!);

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (!pq.isEmpty()) {
    const current = pq.dequeue()!;
    const currentKey = `${current.row},${current.col}`;

    if (visited.has(currentKey)) {
      continue;
    }

    visited.add(currentKey);
    visitedCells.push(current);

    if (current.row === end.row && current.col === end.col) {
      const path: Cell[] = [];
      let temp: Cell | undefined = current;
      while (temp) {
        path.unshift(temp);
        const tempKey = `${temp.row},${temp.col}`;
        temp = cameFrom.get(tempKey);
      }
      return { path, visited: visitedCells };
    }

    for (const [dr, dc] of directions) {
      const newRow = current.row + dr;
      const newCol = current.col + dc;
      const neighborKey = `${newRow},${newCol}`;

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        grid[newRow][newCol].type !== 'wall' &&
        !visited.has(neighborKey)
      ) {
        const neighbor = grid[newRow][newCol];
        const tentativeGScore = (gScore.get(currentKey) || 0) + 1;

        if (
          !gScore.has(neighborKey) ||
          tentativeGScore < gScore.get(neighborKey)!
        ) {
          cameFrom.set(neighborKey, current);
          gScore.set(neighborKey, tentativeGScore);
          const f = tentativeGScore + manhattanDistance(neighbor, end);
          fScore.set(neighborKey, f);
          pq.enqueue(neighbor, f);
        }
      }
    }
  }

  return { path: [], visited: visitedCells };
}
