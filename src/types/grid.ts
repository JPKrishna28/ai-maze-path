export type CellType = 'empty' | 'wall' | 'start' | 'end' | 'visited' | 'path' | 'current' | 'frontier';

export interface Cell {
  row: number;
  col: number;
  type: CellType;
}

export interface PathfindingResult {
  path: Cell[];
  visited: Cell[];
  distance: number;
  timeMs: number;
  nodesVisited: number;
}

export type Algorithm = 'bfs' | 'dfs' | 'astar';

export type EditMode = 'start' | 'end' | 'wall' | null;
