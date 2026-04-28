export default function InputCard({ label, id, type = "text", value, onChange, placeholder = "", disabled = false }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-bold small text-uppercase" htmlFor={id}
        style={{ color: 'var(--text)', letterSpacing: '0.08em' }}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="form-control form-control-lg rounded-3"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}
