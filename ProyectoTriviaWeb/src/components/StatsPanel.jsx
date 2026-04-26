export default function StatsPanel({ stats = [] }) {
  return (
    <div className="card border-0 shadow-sm rounded-4 stats-panel">
      <div className="card-body p-3">
        <ul className="row g-3 text-center list-unstyled m-0">
          {stats.map((item, i) => (
            <li key={i} className="col">
              <strong className="fw-bold fs-4 d-block" style={{ color: 'var(--accent)' }}>
                {item.value}
              </strong>
              <span className="small text-uppercase fw-semibold" style={{ color: 'var(--text)', letterSpacing: '0.06em' }}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
