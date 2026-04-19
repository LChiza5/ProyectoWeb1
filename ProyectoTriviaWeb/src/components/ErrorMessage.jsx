export default function ErrorMessage({ mensaje }) {
  if (!mensaje) return null;

  return (
    <div className="error-message">
      <p>⚠️ {mensaje}</p>
    </div>
  );
}