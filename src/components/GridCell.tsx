import { Cell } from '../types/grid';

interface GridCellProps {
  cell: Cell;
  onMouseDown: (cell: Cell) => void;
  onMouseEnter: (cell: Cell) => void;
  onMouseUp: () => void;
  onContextMenu: (cell: Cell, e: React.MouseEvent) => void;
}

export function GridCell({
  cell,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  onContextMenu,
}: GridCellProps) {
  const getCellColor = () => {
    switch (cell.type) {
      case 'start':
        return 'bg-green-500';
      case 'end':
        return 'bg-red-500';
      case 'wall':
        return 'bg-slate-800';
      case 'visited':
        return 'bg-yellow-200';
      case 'current':
        return 'bg-blue-500';
      case 'frontier':
        return 'bg-orange-300';
      case 'path':
        return 'bg-green-300';
      default:
        return 'bg-white hover:bg-slate-100';
    }
  };

  return (
    <div
      className={`w-6 h-6 border border-slate-200 transition-colors duration-100 cursor-pointer ${getCellColor()}`}
      onMouseDown={() => onMouseDown(cell)}
      onMouseEnter={() => onMouseEnter(cell)}
      onMouseUp={onMouseUp}
      onContextMenu={(e) => onContextMenu(cell, e)}
    />
  );
}
