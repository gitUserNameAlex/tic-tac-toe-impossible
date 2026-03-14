import { useState, useCallback } from 'react';
import type { Difficulty, GamePhase, GameResult, Scores } from './types';

import './App.css';
import DifficultyScreen from './components/DifficultyScreen';
import Game from './components/Game';

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [scores, setScores] = useState<Scores>({ wins: 0, losses: 0, ties: 0 });

  const handleSelectDifficulty = useCallback((d: Difficulty) => {
    setDifficulty(d);
    setPhase('playing');
  }, []);

  const handleGameEnd = useCallback((result: GameResult) => {
    setScores((prev) => ({
      wins: prev.wins + (result === 'win' ? 1 : 0),
      losses: prev.losses + (result === 'lose' ? 1 : 0),
      ties: prev.ties + (result === 'tie' ? 1 : 0),
    }));
    setPhase('gameOver');
  }, []);

  const handlePlayAgain = useCallback(() => {
    setPhase('playing');
  }, []);

  const handleChangeDifficulty = useCallback(() => {
    setPhase('menu');
  }, []);

  return (
    <div className="app">
      <h1 className="app-title">
        <span className="title-tic">Крестики-нолики</span>
      </h1>

      {phase === 'menu' && (
        <DifficultyScreen onSelect={handleSelectDifficulty} />
      )}

      {(phase === 'playing' || phase === 'gameOver') && (
        <Game
          difficulty={difficulty}
          scores={scores}
          isGameOver={phase === 'gameOver'}
          onGameEnd={handleGameEnd}
          onPlayAgain={handlePlayAgain}
          onChangeDifficulty={handleChangeDifficulty}
        />
      )}
    </div>
  );
}
