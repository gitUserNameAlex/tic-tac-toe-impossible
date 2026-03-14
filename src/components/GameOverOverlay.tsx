import type { GameResult } from '../types';
import './GameOverOverlay.css';

interface Props {
  result: GameResult;
  onPlayAgain: () => void;
  onChangeDifficulty: () => void;
}

const resultConfig: Record<GameResult, { text: string; className: string }> = {
  win: { text: 'Победа!', className: 'result--win' },
  lose: { text: 'Поражение!', className: 'result--lose' },
  tie: { text: 'Ничья!', className: 'result--tie' },
};

export default function GameOverOverlay({ result, onPlayAgain, onChangeDifficulty }: Props) {
  const config = resultConfig[result];

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2 className={`overlay-result ${config.className}`}>{config.text}</h2>
        <div className="overlay-buttons">
          <button className="overlay-btn overlay-btn--primary" onClick={onPlayAgain}>
            Играть снова
          </button>
          <button className="overlay-btn overlay-btn--secondary" onClick={onChangeDifficulty}>
            Сменить сложность
          </button>
        </div>
      </div>
    </div>
  );
}
