import type { Difficulty } from '../types';
import './DifficultyScreen.css';

interface Props {
  onSelect: (difficulty: Difficulty) => void;
}

const difficulties: { key: Difficulty; label: string }[] = [
  { key: 'easy', label: 'Легко' },
  { key: 'medium', label: 'Средне' },
  { key: 'impossible', label: 'Невозможно' },
];

export default function DifficultyScreen({ onSelect }: Props) {
  return (
    <div className="difficulty-screen">
      <p className="difficulty-subtitle">Выбери сложность</p>
      <div className="difficulty-cards">
        {difficulties.map((d, i) => (
          <button
            key={d.key}
            className={`difficulty-card difficulty-card--${d.key}`}
            onClick={() => onSelect(d.key)}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="difficulty-label">{d.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
