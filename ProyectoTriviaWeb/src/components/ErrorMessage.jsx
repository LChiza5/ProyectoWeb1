export default function ErrorMessage({ mensaje }) {
  if (!mensaje) return null;

  return (
    <p className="alert alert-warning d-flex align-items-center gap-2 rounded-3 mb-3" role="alert">
      <span aria-hidden="true">⚠️</span>
      <span className="fw-semibold">{mensaje}</span>
    </p>
  );
}
