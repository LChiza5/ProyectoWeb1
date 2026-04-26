export default function Loader() {
  return (
    <div className="d-flex flex-column align-items-center gap-3 py-5">
      <div
        className="spinner-border"
        role="status"
        style={{ width: '3rem', height: '3rem', color: 'var(--accent)', borderWidth: '4px' }}
      >
        <span className="visually-hidden">Cargando...</span>
      </div>
      <p className="fw-semibold mb-0" style={{ color: 'var(--accent)' }}>
        Cargando preguntas...
      </p>
    </div>
  );
}
