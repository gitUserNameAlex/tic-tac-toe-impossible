import { useState, useCallback, useEffect, useRef } from 'react';
import type { BoardState, Difficulty, GameResult, Scores } from '../types';
import { createEmptyBoard, checkWin, checkTie, setBoardCell } from '../utils/gameLogic';
import { getAIMove } from '../utils/ai';
import Board from './Board';
import ScoreBoard from './ScoreBoard';
import GameOverOverlay from './GameOverOverlay';
import './Game.css';

interface Props {
  difficulty: Difficulty;
  scores: Scores;
  isGameOver: boolean;
  onGameEnd: (result: GameResult) => void;
  onPlayAgain: () => void;
  onChangeDifficulty: () => void;
}

export default function Game({
  difficulty,
  scores,
  isGameOver,
  onGameEnd,
  onPlayAgain,
  onChangeDifficulty,
}: Props) {
  const [board, setBoard] = useState<BoardState>(createEmptyBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winningCells, setWinningCells] = useState<number[]>([]);
  const [result, setResult] = useState<GameResult | null>(null);
  const gameEndedRef = useRef(false);

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setIsPlayerTurn(true);
    setWinningCells([]);
    setResult(null);
    gameEndedRef.current = false;
  }, []);

  useEffect(() => {
    if (!isGameOver) {
      setTimeout(() => resetGame(), 0);
    }
  }, [isGameOver, resetGame]);

  const handleEnd = useCallback(
    (newBoard: BoardState) => {
      if (gameEndedRef.current) return;

      const aiWin = checkWin(newBoard, 'X');
      if (aiWin) {
        gameEndedRef.current = true;
        setWinningCells(aiWin.combo);
        setResult('lose');
        setTimeout(() => onGameEnd('lose'), 800);
        return true;
      }

      const humanWin = checkWin(newBoard, 'O');
      if (humanWin) {
        gameEndedRef.current = true;
        setWinningCells(humanWin.combo);
        setResult('win');
        setTimeout(() => onGameEnd('win'), 800);
        return true;
      }

      if (checkTie(newBoard)) {
        gameEndedRef.current = true;
        setResult('tie');
        setTimeout(() => onGameEnd('tie'), 800);
        return true;
      }

      return false;
    },
    [onGameEnd],
  );

  useEffect(() => {
    if (isPlayerTurn || isGameOver || gameEndedRef.current) return;

    const timer = setTimeout(() => {
      setBoard((prev) => {
        if (gameEndedRef.current) return prev;
        const aiIndex = getAIMove(prev, difficulty);
        const newBoard = setBoardCell(prev, aiIndex, 'X');

        setTimeout(() => {
          if (!handleEnd(newBoard)) {
            setIsPlayerTurn(true);
          }
        }, 50);

        return newBoard;
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [isPlayerTurn, isGameOver, difficulty, handleEnd]);

  const handleCellClick = useCallback(
    (index: number) => {
      if (!isPlayerTurn || board[index] !== null || isGameOver || gameEndedRef.current) return;

      const newBoard = setBoardCell(board, index, 'O');
      setBoard(newBoard);

      if (!handleEnd(newBoard)) {
        setIsPlayerTurn(false);
      }
    },
    [board, isPlayerTurn, isGameOver, handleEnd],
  );

  return (
    <div className="game">
      <ScoreBoard scores={scores} difficulty={difficulty} />

      <div className="game-turn-indicator">
        {!isGameOver && (
          <span className={`turn-text ${isPlayerTurn ? 'turn--player' : 'turn--ai'}`}>
            {isPlayerTurn ? 'Твой ход' : 'ИИ думает...'}
          </span>
        )}
      </div>

      <Board
        board={board}
        winningCells={winningCells}
        disabled={!isPlayerTurn || isGameOver}
        onCellClick={handleCellClick}
      />

      {isGameOver && result && (
        <GameOverOverlay
          result={result}
          onPlayAgain={onPlayAgain}
          onChangeDifficulty={onChangeDifficulty}
        />
      )}
    </div>
  );
}
