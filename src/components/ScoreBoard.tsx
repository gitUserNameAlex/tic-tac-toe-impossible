import type { Scores, Difficulty } from '../types';
import './ScoreBoard.css';

interface Props {
  scores: Scores;
  difficulty: Difficulty;
}

const difficultyLabels: Record<Difficulty, string> = {
  easy: 'Легко',
  medium: 'Средне',
  impossible: 'Невозможно',
};

export default function ScoreBoard({ scores, difficulty }: Props) {
  return (
    <div className="scoreboard">
      <div className="scoreboard-difficulty">
        {difficultyLabels[difficulty]}
      </div>
      <div className="scoreboard-stats">
        <div className="stat stat--win">
          <span className="stat-value">{scores.wins}</span>
          <span className="stat-label">Победы</span>
        </div>
        <div className="stat stat--tie">
          <span className="stat-value">{scores.ties}</span>
          <span className="stat-label">Ничьи</span>
        </div>
        <div className="stat stat--loss">
          <span className="stat-value">{scores.losses}</span>
          <span className="stat-label">Поражения</span>
        </div>
      </div>
    </div>
  );
}
