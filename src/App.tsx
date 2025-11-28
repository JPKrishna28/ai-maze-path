import { useState, useCallback, useEffect } from 'react';
import { Cell, EditMode, Algorithm } from './types/grid';
import { Grid } from './components/Grid';
import { ControlPanel } from './components/ControlPanel';
import { generateMaze } from './utils/mazeGenerator';
import { usePathfindingVisualization } from './hooks/usePathfindingVisualization';

const GRID_ROWS = 30;
const GRID_COLS = 30;

function createInitialGrid(): Cell[][] {
  const grid: Cell[][] = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    const currentRow: Cell[] = [];
    for (let col = 0; col < GRID_COLS; col++) {
      currentRow.push({
        row,
        col,
        type: 'empty',
      });
    }
    grid.push(currentRow);
  }

  grid[5][5].type = 'start';
  grid[24][24].type = 'end';

  return grid;
}

function App() {
  const [grid, setGrid] = useState<Cell[][]>(createInitialGrid());
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [start, setStart] = useState<Cell | null>({ row: 5, col: 5, type: 'start' });
  const [end, setEnd] = useState<Cell | null>({ row: 24, col: 24, type: 'end' });

  const { runAlgorithm, isRunning, stats } = usePathfindingVisualization();

  useEffect(() => {
    document.title = 'PathFinder AI - Maze Solver Visualizer';
  }, []);

  const clearVisualization = useCallback(() => {
    setGrid((prevGrid) =>
      prevGrid.map((row) =>
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
      )
    );
  }, []);

  const handleCellClick = useCallback(
    (cell: Cell) => {
      if (isRunning) return;

      clearVisualization();

      const newGrid = grid.map((row) => row.map((c) => ({ ...c })));

      if (editMode === 'start') {
        if (start) {
          newGrid[start.row][start.col].type = 'empty';
        }
        newGrid[cell.row][cell.col].type = 'start';
        setStart({ row: cell.row, col: cell.col, type: 'start' });
      } else if (editMode === 'end') {
        if (end) {
          newGrid[end.row][end.col].type = 'empty';
        }
        newGrid[cell.row][cell.col].type = 'end';
        setEnd({ row: cell.row, col: cell.col, type: 'end' });
      } else if (editMode === 'wall') {
        if (cell.type !== 'start' && cell.type !== 'end') {
          newGrid[cell.row][cell.col].type = 'wall';
        }
      }

      setGrid(newGrid);
    },
    [editMode, grid, start, end, isRunning, clearVisualization]
  );

  const handleMouseDown = useCallback(
    (cell: Cell) => {
      setIsMouseDown(true);
      handleCellClick(cell);
    },
    [handleCellClick]
  );

  const handleMouseEnter = useCallback(
    (cell: Cell) => {
      if (isMouseDown && editMode === 'wall' && !isRunning) {
        clearVisualization();
        const newGrid = grid.map((row) => row.map((c) => ({ ...c })));
        if (cell.type !== 'start' && cell.type !== 'end') {
          newGrid[cell.row][cell.col].type = 'wall';
        }
        setGrid(newGrid);
      }
    },
    [isMouseDown, editMode, grid, isRunning, clearVisualization]
  );

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  const handleContextMenu = useCallback(
    (cell: Cell, e: React.MouseEvent) => {
      e.preventDefault();
      if (isRunning) return;

      clearVisualization();

      const newGrid = grid.map((row) => row.map((c) => ({ ...c })));
      if (cell.type === 'wall') {
        newGrid[cell.row][cell.col].type = 'empty';
        setGrid(newGrid);
      }
    },
    [grid, isRunning, clearVisualization]
  );

  const handleGenerateMaze = useCallback(() => {
    if (isRunning) return;
    const newGrid = generateMaze(grid);
    setGrid(newGrid);
  }, [grid, isRunning]);

  const handleSolve = useCallback(
    (algorithm: Algorithm) => {
      if (!start || !end || isRunning) return;
      clearVisualization();
      runAlgorithm(algorithm, grid, start, end, setGrid);
    },
    [grid, start, end, isRunning, runAlgorithm, clearVisualization]
  );

  const handleReset = useCallback(() => {
    if (isRunning) return;
    const newGrid = createInitialGrid();
    setGrid(newGrid);
    setStart({ row: 5, col: 5, type: 'start' });
    setEnd({ row: 24, col: 24, type: 'end' });
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-slate-800 mb-2">
            PathFinder AI
          </h1>
          <p className="text-slate-600 text-lg">
            Visualize pathfinding algorithms in action
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="flex-shrink-0">
            <Grid
              grid={grid}
              onMouseDown={handleMouseDown}
              onMouseEnter={handleMouseEnter}
              onMouseUp={handleMouseUp}
              onContextMenu={handleContextMenu}
            />
          </div>

          <div className="w-full lg:w-80">
            <ControlPanel
              editMode={editMode}
              onSetEditMode={setEditMode}
              onGenerateMaze={handleGenerateMaze}
              onSolve={handleSolve}
              onReset={handleReset}
              isRunning={isRunning}
              stats={stats}
            />
          </div>
        </div>

        <div className="mt-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            How to Use
          </h2>
          <div className="space-y-3 text-slate-700">
            <div className="flex items-start gap-3">
              <div className="bg-green-500 w-6 h-6 rounded flex-shrink-0 mt-1"></div>
              <div>
                <strong>Green cell:</strong> Starting point
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-red-500 w-6 h-6 rounded flex-shrink-0 mt-1"></div>
              <div>
                <strong>Red cell:</strong> Destination
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-slate-800 w-6 h-6 rounded flex-shrink-0 mt-1"></div>
              <div>
                <strong>Dark cells:</strong> Walls (click to add, right-click
                to remove)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-yellow-200 w-6 h-6 rounded flex-shrink-0 mt-1"></div>
              <div>
                <strong>Yellow cells:</strong> Nodes explored by the algorithm
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-300 w-6 h-6 rounded flex-shrink-0 mt-1"></div>
              <div>
                <strong>Light green cells:</strong> Final shortest path
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
