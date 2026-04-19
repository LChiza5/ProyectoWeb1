import { useLocation } from "react-router-dom";

export default function Result() {
  const { state } = useLocation();

  const total = state?.total || 0;
  const correct = state?.correct || 0;

  const percent = total ? Math.round((correct / total) * 100) : 0;

  return (
    <main className="container text-center mt-5" role="main">
      
      <header className="mb-4">
        <h1>Resultados del juego</h1>
        <p className="text-muted">
          Resumen de tu rendimiento
        </p>
      </header>

      <section aria-label="Resumen de resultados">
        <article className="card p-4 mt-3 shadow-sm">
          
          <header className="mb-3">
            <h2 className="h4">Resumen final</h2>
          </header>

          <ul className="list-unstyled mb-0">
            <li><strong>Total de preguntas:</strong> {total}</li>
            <li><strong>Respuestas correctas:</strong> {correct}</li>
            <li><strong>Porcentaje:</strong> {percent}%</li>
          </ul>

        </article>
      </section>

      <footer className="mt-4">
        <small className="text-muted">
          Juego de trivia completado
        </small>
      </footer>

    </main>
  );
}