export default function QuestionCard({ textoPregunta }) {
  return (
    <article className="question-card" aria-label="Pregunta actual">
      <p className="question-text">{textoPregunta}</p>
    </article>
  );
}
