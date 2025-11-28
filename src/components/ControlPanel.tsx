import { Play, RotateCcw, Wand2 } from 'lucide-react';
import { EditMode, Algorithm } from '../types/grid';

interface ControlPanelProps {
  editMode: EditMode;
  onSetEditMode: (mode: EditMode) => void;
  onGenerateMaze: () => void;
  onSolve: (algorithm: Algorithm) => void;
  onReset: () => void;
  isRunning: boolean;
  stats: {
    algorithm: string;
    timeMs: number;
    nodesVisited: number;
    pathLength: number;
  } | null;
}

export function ControlPanel({
  editMode,
  onSetEditMode,
  onGenerateMaze,
  onSolve,
  onReset,
  isRunning,
  stats,
}: ControlPanelProps) {
  const Button = ({
    onClick,
    active,
    disabled,
    children,
    variant = 'default',
  }: {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    variant?: 'default' | 'primary' | 'danger';
  }) => {
    const baseClasses =
      'px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    const variantClasses = {
      default: active
        ? 'bg-slate-700 text-white'
        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300',
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg',
      danger:
        'bg-rose-600 text-white hover:bg-rose-700 shadow-md hover:shadow-lg',
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses[variant]}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-3">Edit Mode</h2>
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => onSetEditMode('start')}
            active={editMode === 'start'}
            disabled={isRunning}
          >
            Set Start
          </Button>
          <Button
            onClick={() => onSetEditMode('end')}
            active={editMode === 'end'}
            disabled={isRunning}
          >
            Set End
          </Button>
          <Button
            onClick={() => onSetEditMode('wall')}
            active={editMode === 'wall'}
            disabled={isRunning}
          >
            Add Walls
          </Button>
          <Button
            onClick={() => onSetEditMode(null)}
            active={editMode === null}
            disabled={isRunning}
          >
            None
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-3">Maze</h2>
        <Button
          onClick={onGenerateMaze}
          disabled={isRunning}
          variant="default"
        >
          <div className="flex items-center gap-2">
            <Wand2 size={18} />
            Generate Maze
          </div>
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-3">
          Pathfinding Algorithms
        </h2>
        <div className="space-y-2">
          <Button
            onClick={() => onSolve('bfs')}
            disabled={isRunning}
            variant="primary"
          >
            <div className="flex items-center gap-2">
              <Play size={18} />
              Solve using BFS
            </div>
          </Button>
          <Button
            onClick={() => onSolve('dfs')}
            disabled={isRunning}
            variant="primary"
          >
            <div className="flex items-center gap-2">
              <Play size={18} />
              Solve using DFS
            </div>
          </Button>
          <Button
            onClick={() => onSolve('astar')}
            disabled={isRunning}
            variant="primary"
          >
            <div className="flex items-center gap-2">
              <Play size={18} />
              Solve using A*
            </div>
          </Button>
        </div>
      </div>

      <div>
        <Button onClick={onReset} disabled={isRunning} variant="danger">
          <div className="flex items-center gap-2">
            <RotateCcw size={18} />
            Reset Grid
          </div>
        </Button>
      </div>

      {stats && (
        <div className="border-t border-slate-200 pt-4">
          <h2 className="text-xl font-bold text-slate-800 mb-3">Statistics</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Algorithm:</span>
              <span className="font-semibold text-slate-800">
                {stats.algorithm.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Time:</span>
              <span className="font-semibold text-slate-800">
                {stats.timeMs.toFixed(2)} ms
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Nodes Visited:</span>
              <span className="font-semibold text-slate-800">
                {stats.nodesVisited}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Path Length:</span>
              <span className="font-semibold text-slate-800">
                {stats.pathLength > 0 ? stats.pathLength : 'No path found'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
