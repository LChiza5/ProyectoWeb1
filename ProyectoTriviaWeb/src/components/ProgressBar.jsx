export default function ProgressBar({ value = 0, max = 100, label = "" }) {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div>
      {label && (
        <div className="d-flex justify-content-between small mb-1" style={{ color: 'var(--text)' }}>
          <span>{label}</span>
          <span>{percent}%</span>
        </div>
      )}
      <div
        className="progress rounded-pill"
        style={{ height: '10px', background: 'var(--border)' }}
      >
        <div
          className="progress-bar rounded-pill"
          role="progressbar"
          style={{ width: `${percent}%`, background: 'linear-gradient(90deg, var(--accent), #c084fc)', transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
