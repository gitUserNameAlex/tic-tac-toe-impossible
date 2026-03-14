export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type BoardState = CellValue[];
export type Difficulty = 'easy' | 'medium' | 'impossible';
export type GamePhase = 'menu' | 'playing' | 'gameOver';
export type GameResult = 'win' | 'lose' | 'tie';

export interface Scores {
  wins: number;
  losses: number;
  ties: number;
}

export interface WinInfo {
  combo: number[];
  player: Player;
}
