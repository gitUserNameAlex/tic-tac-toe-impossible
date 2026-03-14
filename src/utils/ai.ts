import type { BoardState, Difficulty, Player } from '../types';
import { checkWin, getEmptyIndices } from './gameLogic';

const AI: Player = 'X';
const HUMAN: Player = 'O';

interface MinimaxResult {
  score: number;
  index: number;
}

function minimax(board: BoardState, player: Player, depth: number): MinimaxResult {
  const available = getEmptyIndices(board);

  if (checkWin(board, HUMAN)) return { score: -10 + depth, index: -1 };
  if (checkWin(board, AI)) return { score: 10 - depth, index: -1 };
  if (available.length === 0) return { score: 0, index: -1 };

  const moves: MinimaxResult[] = [];

  for (const idx of available) {
    const next = [...board];
    next[idx] = player;
    const result = minimax(next, player === AI ? HUMAN : AI, depth + 1);
    moves.push({ score: result.score, index: idx });
  }

  if (player === AI) {
    let best = -Infinity;
    let bestIdx = 0;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > best) {
        best = moves[i].score;
        bestIdx = i;
      }
    }
    return moves[bestIdx];
  } else {
    let best = Infinity;
    let bestIdx = 0;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < best) {
        best = moves[i].score;
        bestIdx = i;
      }
    }
    return moves[bestIdx];
  }
}

function getRandomMove(board: BoardState): number {
  const available = getEmptyIndices(board);
  return available[Math.floor(Math.random() * available.length)];
}

export function getAIMove(board: BoardState, difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy':
      return getRandomMove(board);

    case 'medium': {
      if (Math.random() < 0.5) {
        return minimax(board, AI, 0).index;
      }
      return getRandomMove(board);
    }

    case 'impossible':
      return minimax(board, AI, 0).index;
  }
}
