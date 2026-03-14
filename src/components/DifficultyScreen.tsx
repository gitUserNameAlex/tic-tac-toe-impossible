import type { Difficulty } from '../types';
import './DifficultyScreen.css';

interface Props {
  onSelect: (difficulty: Difficulty) => void;
}

const difficulties: { key: Difficulty; label: string; icon: string; desc: string }[] = [
  { key: 'easy', label: 'Легко', icon: '🌱', desc: 'Случайные ходы. Для разминки!' },
  { key: 'medium', label: 'Средне', icon: '⚡', desc: 'Стратегия вперемешку со случайностью.' },
  { key: 'impossible', label: 'Невозможно', icon: '🔥', desc: 'Идеальный ИИ. Сможешь свести вничью?' },
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
            <span className="difficulty-icon">{d.icon}</span>
            <span className="difficulty-label">{d.label}</span>
            <span className="difficulty-desc">{d.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
