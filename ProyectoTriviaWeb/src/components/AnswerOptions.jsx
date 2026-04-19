export default function AnswerOptions({
  opciones,
  onSelect,
  disabled,
  correctAnswer
}) {
  return (
    <section className="d-grid gap-3">

      {opciones.map((opcion, i) => {
        const isCorrect = opcion === correctAnswer;

        return (
          <button
            key={i}
            className={`btn btn-lg ${
              disabled
                ? isCorrect
                  ? "btn-success"
                  : "btn-secondary"
                : "btn-outline-primary"
            }`}
            onClick={() => onSelect(opcion)}
            disabled={disabled}
          >
            {opcion}
          </button>
        );
      })}

    </section>
  );
}
