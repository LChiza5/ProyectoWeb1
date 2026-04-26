export default function QuestionCard({ textoPregunta }) {
  return (
    <article className="card shadow rounded-4 border-0 question-card">
      <div className="card-body p-4 p-md-5 text-center">
        <p className="card-text fs-5 fw-semibold lh-base mb-0" style={{ color: 'var(--text-h)' }}>
          {textoPregunta}
        </p>
      </div>
    </article>
  );
}
