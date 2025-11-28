import { useState, useCallback } from 'react';
import { Cell, Algorithm } from '../types/grid';
import { bfs } from '../algorithms/bfs';
import { dfs } from '../algorithms/dfs';
import { aStar } from '../algorithms/astar';

export function usePathfindingVisualization() {
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState<{
    algorithm: string;
    timeMs: number;
    nodesVisited: number;
    pathLength: number;
  } | null>(null);

  const animate = useCallback(
    async (
      grid: Cell[][],
      visited: Cell[],
      path: Cell[],
      setGrid: (grid: Cell[][]) => void
    ) => {
      const newGrid = grid.map((row) =>
        row.map((cell) => ({
          ...cell,
          type:
            cell.type === 'visited' ||
            cell.type === 'path' ||
            cell.type === 'current' ||
            cell.type === 'frontier'
              ? 'empty'
              : cell.type,
        }))
      );

      for (let i = 0; i < visited.length; i++) {
        const cell = visited[i];
        if (
          newGrid[cell.row][cell.col].type !== 'start' &&
          newGrid[cell.row][cell.col].type !== 'end'
        ) {
          newGrid[cell.row][cell.col].type = 'current';
          setGrid(
            newGrid.map((row) => row.map((c) => ({ ...c })))
          );
          await new Promise((resolve) => setTimeout(resolve, 10));

          newGrid[cell.row][cell.col].type = 'visited';
          setGrid(
            newGrid.map((row) => row.map((c) => ({ ...c })))
          );
        }
      }

      for (let i = 0; i < path.length; i++) {
        const cell = path[i];
        if (
          newGrid[cell.row][cell.col].type !== 'start' &&
          newGrid[cell.row][cell.col].type !== 'end'
        ) {
          newGrid[cell.row][cell.col].type = 'path';
          setGrid(
            newGrid.map((row) => row.map((c) => ({ ...c })))
          );
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
      }
    },
    []
  );

  const runAlgorithm = useCallback(
    async (
      algorithm: Algorithm,
      grid: Cell[][],
      start: Cell | null,
      end: Cell | null,
      setGrid: (grid: Cell[][]) => void
    ) => {
      if (!start || !end || isRunning) return;

      setIsRunning(true);
      setStats(null);

      const startTime = performance.now();
      let result: { path: Cell[]; visited: Cell[] };

      switch (algorithm) {
        case 'bfs':
          result = bfs(grid, start, end);
          break;
        case 'dfs':
          result = dfs(grid, start, end);
          break;
        case 'astar':
          result = aStar(grid, start, end);
          break;
      }

      const endTime = performance.now();

      await animate(grid, result.visited, result.path, setGrid);

      setStats({
        algorithm,
        timeMs: endTime - startTime,
        nodesVisited: result.visited.length,
        pathLength: result.path.length,
      });

      setIsRunning(false);
    },
    [isRunning, animate]
  );

  return { runAlgorithm, isRunning, stats };
}
