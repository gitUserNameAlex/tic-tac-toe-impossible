import type { CellValue } from '../types';
import './Cell.css';

interface Props {
  value: CellValue;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

function XMark() {
  return (
    <svg className="cell-svg x-mark" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <line className="x-line" x1="20" y1="20" x2="80" y2="80" />
      <line className="x-line x-line--delayed" x1="80" y1="20" x2="20" y2="80" />
    </svg>
  );
}

function OMark() {
  return (
    <svg className="cell-svg o-mark" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle className="o-circle" cx="50" cy="50" r="30" />
    </svg>
  );
}

export default function Cell({ value, onClick, isWinning, disabled }: Props) {
  return (
    <button
      className={`cell ${value ? 'cell--filled' : ''} ${isWinning ? 'cell--winning' : ''} ${disabled ? 'cell--disabled' : ''}`}
      onClick={onClick}
      disabled={disabled || value !== null}
    >
      {value === 'X' && <XMark />}
      {value === 'O' && <OMark />}
    </button>
  );
}
