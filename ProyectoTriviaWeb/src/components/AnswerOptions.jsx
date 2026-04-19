export default function AnswerOptions({ opciones, onSelect, disabled, correctAnswer }) {
  return (
    <section aria-label="Opciones de respuesta">
      <ul className="answers-grid" role="list">
        {opciones.map((opcion, i) => {
          const isCorrect = opcion === correctAnswer;

          let className = "answer-btn";
          if (disabled) {
            className += isCorrect ? " correct" : " incorrect";
          }

          return (
            <li key={i}>
              <button
                className={className}
                onClick={() => onSelect(opcion)}
                disabled={disabled}
                aria-pressed={disabled && isCorrect ? true : undefined}
              >
                {opcion}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
