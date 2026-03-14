import type { BoardState } from '../types';
import Cell from './Cell';
import './Board.css';

interface Props {
  board: BoardState;
  winningCells: number[];
  disabled: boolean;
  onCellClick: (index: number) => void;
}

export default function Board({ board, winningCells, disabled, onCellClick }: Props) {
  return (
    <div className="board">
      {board.map((value, i) => (
        <Cell
          key={i}
          value={value}
          onClick={() => onCellClick(i)}
          isWinning={winningCells.includes(i)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
