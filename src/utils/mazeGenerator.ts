import { Cell } from '../types/grid';

export function generateMaze(grid: Cell[][]): Cell[][] {
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = grid.map((row) =>
    row.map((cell) => ({
      ...cell,
      type: cell.type === 'start' || cell.type === 'end' ? cell.type : 'wall',
    })) as Cell[]
  );

  const visited = new Set<string>();
  const stack: Cell[] = [];

  const startRow = 1;
  const startCol = 1;
  const startCell = newGrid[startRow][startCol];

  if (startCell.type !== 'start' && startCell.type !== 'end') {
    startCell.type = 'empty';
  }

  visited.add(`${startRow},${startCol}`);
  stack.push(startCell);

  const directions = [
    [-2, 0],
    [2, 0],
    [0, -2],
    [0, 2],
  ];

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbors: { cell: Cell; wallRow: number; wallCol: number }[] = [];

    for (const [dr, dc] of directions) {
      const newRow = current.row + dr;
      const newCol = current.col + dc;
      const wallRow = current.row + dr / 2;
      const wallCol = current.col + dc / 2;

      if (
        newRow > 0 &&
        newRow < rows - 1 &&
        newCol > 0 &&
        newCol < cols - 1 &&
        !visited.has(`${newRow},${newCol}`)
      ) {
        neighbors.push({
          cell: newGrid[newRow][newCol],
          wallRow,
          wallCol,
        });
      }
    }

    if (neighbors.length > 0) {
      const randomNeighbor =
        neighbors[Math.floor(Math.random() * neighbors.length)];
      const { cell, wallRow, wallCol } = randomNeighbor;

      if (cell.type !== 'start' && cell.type !== 'end') {
        cell.type = 'empty';
      }

      const wallCell = newGrid[wallRow][wallCol];
      if (wallCell.type !== 'start' && wallCell.type !== 'end') {
        wallCell.type = 'empty';
      }

      visited.add(`${cell.row},${cell.col}`);
      stack.push(cell);
    } else {
      stack.pop();
    }
  }

  for (let i = 0; i < Math.floor((rows * cols) / 40); i++) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (
      newGrid[row][col].type !== 'start' &&
      newGrid[row][col].type !== 'end'
    ) {
      newGrid[row][col].type = 'empty';
    }
  }

  return newGrid;
}
