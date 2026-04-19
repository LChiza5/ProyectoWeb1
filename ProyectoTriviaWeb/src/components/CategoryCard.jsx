export default function CategoryCard({
  label,
  id,
  value,
  onChange,
  options
}) {
  return (
    <p className="form-group">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>

      <select
        id={id}
        className="form-select-custom"
        value={value}
        onChange={onChange}
      >
        <option value="">— Seleccionar —</option>

        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </p>
  );
}
