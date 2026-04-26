const colores = ['answer-a', 'answer-b', 'answer-c', 'answer-d'];

export default function AnswerOptions({ opciones, onSelect, disabled, correctAnswer }) {
  return (
    <section aria-label="Opciones de respuesta">
      <div className="row g-3">
        {opciones.map((opcion, i) => {
          const esCorrecta = opcion === correctAnswer;

          let clase = `btn btn-lg w-100 text-start d-flex align-items-center gap-2 ${colores[i]}`;
          if (disabled && esCorrecta) clase += ' correct-answer';
          if (disabled && !esCorrecta) clase += ' wrong-answer';

          return (
            <div key={i} className="col-12 col-sm-6">
              <button
                className={clase}
                onClick={() => onSelect(opcion)}
                disabled={disabled}
              >
                <span className="answer-letter">{String.fromCharCode(65 + i)}</span>
                {opcion}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
