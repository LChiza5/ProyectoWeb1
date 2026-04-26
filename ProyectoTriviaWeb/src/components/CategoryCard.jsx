export default function CategoryCard({ label, id, value, onChange, options }) {
  return (
    <div className="mb-4">
      <label className="form-label fw-bold small text-uppercase" htmlFor={id}
        style={{ color: 'var(--text)', letterSpacing: '0.08em' }}>
        {label}
      </label>
      <select
        id={id}
        className="form-select form-select-lg rounded-3"
        value={value}
        onChange={onChange}
      >
        <option value="">— Seleccionar —</option>
        {options.map((opcion, i) => (
          <option key={i} value={opcion.value}>
            {opcion.label}
          </option>
        ))}
      </select>
    </div>
  );
}
