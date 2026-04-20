export default function InputCard({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder = ""
}) {
  return (
    <p className="form-group">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>

      <input
        id={id}
        type={type}
        className="form-select-custom"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </p>
  );
}