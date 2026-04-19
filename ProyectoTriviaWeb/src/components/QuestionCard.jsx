export default function QuestionCard({ textoPregunta, numero }) {
  return (
    <div>
      <h2>Pregunta {numero}</h2>
      <p>{textoPregunta}</p>
    </div>
  );
}
