import type { BoardState, CellValue, Player, WinInfo } from '../types';

export const WIN_COMBOS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

export function createEmptyBoard(): BoardState {
  return Array(9).fill(null);
}

export function getEmptyIndices(board: BoardState): number[] {
  return board.reduce<number[]>((acc, cell, i) => {
    if (cell === null) acc.push(i);
    return acc;
  }, []);
}

export function checkWin(board: BoardState, player: Player): WinInfo | null {
  for (const combo of WIN_COMBOS) {
    if (combo.every((idx) => board[idx] === player)) {
      return { combo, player };
    }
  }
  return null;
}

export function checkTie(board: BoardState): boolean {
  return getEmptyIndices(board).length === 0 && !checkWin(board, 'X') && !checkWin(board, 'O');
}

export function setBoardCell(board: BoardState, index: number, value: CellValue): BoardState {
  const next = [...board];
  next[index] = value;
  return next;
}
