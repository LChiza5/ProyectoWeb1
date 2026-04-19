export default function QuestionCard({ textoPregunta }) {
  return (
    <section className="text-center my-4">
      <h3 className="fw-bold fs-4">{textoPregunta}</h3>
    </section>
  );
}