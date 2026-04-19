import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import AnswerOptions from "../components/AnswerOptions";
import ScoreBoard from "../components/ScoreBoard";

// Fuera del componente: función pura, no genera re-renders
function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function Game() {
  const location = useLocation();
  const navigate = useNavigate();

  const categoria = location.state?.categoria || "history";
  const dificultad = location.state?.dificultad || "easy";

  const [preguntas, setPreguntas] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);

  // =========================
  // FETCH PREGUNTAS
  // El shuffle se hace UNA SOLA VEZ acá, al recibir los datos.
  // No hay segundo effect ni segundo estado para opciones.
  // =========================
  useEffect(() => {
    const url = `https://the-trivia-api.com/v2/questions?limit=10&categories=${categoria}&difficulty=${dificultad}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener las preguntas");
        return res.json();
      })
      .then((data) => {
        const preguntasConOpciones = data.map((q) => ({
          ...q,
          opciones: shuffleArray([...q.incorrectAnswers, q.correctAnswer]),
        }));
        setPreguntas(preguntasConOpciones);
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []); // [] porque categoria y dificultad no cambian durante el juego

  // =========================
  // ESTADÍSTICAS
  // =========================
  const totalPreguntas = preguntas.length;
  const preguntaActualNumero = indiceActual + 1;

  const progresoPorcentaje = totalPreguntas
    ? Math.round((preguntaActualNumero / totalPreguntas) * 100)
    : 0;

  const porcentajePuntaje = totalPreguntas
    ? Math.round((puntaje / totalPreguntas) * 100)
    : 0;

  // =========================
  // LOADING / ERROR
  // =========================
  if (cargando) return <div>Cargando preguntas...</div>;
  if (error) return <div>Error: {error}</div>;

  // =========================
  // FIN DEL JUEGO
  // =========================
  if (indiceActual >= preguntas.length) {
    return (
      <div className="container text-center mt-5">
        <h2>Juego terminado</h2>
        <p>Puntaje final: {puntaje}</p>
        <button
          className="btn btn-primary mt-3"
          onClick={() =>
            navigate("/result", {
              state: { puntaje, total: preguntas.length },
            })
          }
        >
          Ver resultados
        </button>
      </div>
    );
  }

  const preguntaActual = preguntas[indiceActual];

  if (!preguntaActual) return <div>Cargando pregunta...</div>;

  // =========================
  // MANEJAR RESPUESTA
  // =========================
  const manejarRespuesta = (respuesta) => {
    setDisabled(true);
    setRespuestaCorrecta(preguntaActual.correctAnswer);

    if (respuesta === preguntaActual.correctAnswer) {
      setPuntaje((prev) => prev + 1);
    }

    setTimeout(() => {
      setIndiceActual((prev) => prev + 1);
      setDisabled(false);
      setRespuestaCorrecta(null);
    }, 1200);
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="container mt-4">
      <ScoreBoard
        current={preguntaActualNumero}
        total={totalPreguntas}
        score={puntaje}
        progressPercent={progresoPorcentaje}
        scorePercent={porcentajePuntaje}
      />

      <QuestionCard textoPregunta={preguntaActual.question.text} />

      <AnswerOptions
        opciones={preguntaActual.opciones}
        onSelect={manejarRespuesta}
        disabled={disabled}
        correctAnswer={respuestaCorrecta}
      />
    </div>
  );
}
