import { Cell } from '../types/grid';

export function bfs(
  grid: Cell[][],
  start: Cell,
  end: Cell
): { path: Cell[]; visited: Cell[] } {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set<string>();
  const queue: { cell: Cell; path: Cell[] }[] = [];
  const visitedCells: Cell[] = [];

  queue.push({ cell: start, path: [start] });
  visited.add(`${start.row},${start.col}`);

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (queue.length > 0) {
    const { cell, path } = queue.shift()!;
    visitedCells.push(cell);

    if (cell.row === end.row && cell.col === end.col) {
      return { path, visited: visitedCells };
    }

    for (const [dr, dc] of directions) {
      const newRow = cell.row + dr;
      const newCol = cell.col + dc;
      const key = `${newRow},${newCol}`;

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        !visited.has(key) &&
        grid[newRow][newCol].type !== 'wall'
      ) {
        visited.add(key);
        const neighbor = grid[newRow][newCol];
        queue.push({ cell: neighbor, path: [...path, neighbor] });
      }
    }
  }

  return { path: [], visited: visitedCells };
}
