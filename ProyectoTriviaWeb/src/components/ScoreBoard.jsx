export default function ScoreBoard({ current, total, score, progressPercent }) {
  return (
    <section className="scoreboard" aria-label="Estado del juego">
      <p className="scoreboard-stats">
        <span>Pregunta <strong>{current}</strong> de <strong>{total}</strong></span>
        <span className="score-badge" aria-label={`${score} respuestas correctas`}>
          ⭐ {score} correctas
        </span>
      </p>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso de la partida"
      >
        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>
    </section>
  );
}
