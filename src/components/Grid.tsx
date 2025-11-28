import { Cell } from '../types/grid';
import { GridCell } from './GridCell';

interface GridProps {
  grid: Cell[][];
  onMouseDown: (cell: Cell) => void;
  onMouseEnter: (cell: Cell) => void;
  onMouseUp: () => void;
  onContextMenu: (cell: Cell, e: React.MouseEvent) => void;
}

export function Grid({
  grid,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  onContextMenu,
}: GridProps) {
  return (
    <div className="inline-block bg-slate-100 p-4 rounded-lg shadow-lg">
      <div className="flex flex-col">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="flex">
            {row.map((cell) => (
              <GridCell
                key={`${cell.row}-${cell.col}`}
                cell={cell}
                onMouseDown={onMouseDown}
                onMouseEnter={onMouseEnter}
                onMouseUp={onMouseUp}
                onContextMenu={onContextMenu}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
