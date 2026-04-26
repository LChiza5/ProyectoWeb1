export default function ScoreBoard({ current, total, score, progressPercent }) {
  return (
    <section className="card shadow-sm border-0 rounded-4 p-3 scoreboard" aria-label="Estado del juego">

      <div className="d-flex justify-content-between align-items-center mb-2">

        <span className="small fw-semibold" style={{ color: 'var(--text)' }}>
          Pregunta <strong style={{ color: 'var(--text-h)' }}>{current}</strong> / <strong style={{ color: 'var(--text-h)' }}>{total}</strong>
        </span>

        <span className="badge rounded-pill px-3 py-2 score-badge" aria-label={`${score} respuestas correctas`}>
          ⭐ {score} correctas
        </span>

        <span className="small fw-bold" style={{ color: 'var(--accent)' }}>
          {progressPercent}%
        </span>

      </div>

      <div
        className="progress"
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ height: '10px', borderRadius: '99px', background: 'var(--border)' }}
      >
        <div
          className="progress-bar"
          style={{ width: `${progressPercent}%`, background: 'linear-gradient(90deg, var(--accent), #c084fc)', transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </div>

    </section>
  );
}
