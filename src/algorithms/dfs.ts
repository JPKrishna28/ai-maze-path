import { Cell } from '../types/grid';

export function dfs(
  grid: Cell[][],
  start: Cell,
  end: Cell
): { path: Cell[]; visited: Cell[] } {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set<string>();
  const visitedCells: Cell[] = [];

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  function dfsRecursive(cell: Cell, path: Cell[]): Cell[] | null {
    const key = `${cell.row},${cell.col}`;

    if (visited.has(key)) {
      return null;
    }

    visited.add(key);
    visitedCells.push(cell);

    if (cell.row === end.row && cell.col === end.col) {
      return [...path, cell];
    }

    for (const [dr, dc] of directions) {
      const newRow = cell.row + dr;
      const newCol = cell.col + dc;

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        grid[newRow][newCol].type !== 'wall'
      ) {
        const neighbor = grid[newRow][newCol];
        const result = dfsRecursive(neighbor, [...path, cell]);
        if (result) {
          return result;
        }
      }
    }

    return null;
  }

  const resultPath = dfsRecursive(start, []);
  return { path: resultPath || [], visited: visitedCells };
}
