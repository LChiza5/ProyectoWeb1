import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import AnswerOptions from "../components/AnswerOptions";
import ScoreBoard from "../components/ScoreBoard";
import Timer from "../components/Timer";
import { prepararPreguntas } from "../utils/gameHelpers";
import { calcularPorcentaje } from "../utils/math";
import { difficultyTime } from "../utils/difficultyTime";
import { traducirTexto } from "../utils/translate";
import { UI } from "../utils/translations";

export default function Game() {
  const location = useLocation();
  const navigate = useNavigate();

  const categoria = location.state?.categoria || "history";
  const dificultad = location.state?.dificultad || "easy";
  const idioma = location.state?.idioma || "es";
  const t = UI[idioma];

  const [preguntas, setPreguntas] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);

  useEffect(() => {
    const obtenerPreguntas = async () => {
      try {
        const url = `https://the-trivia-api.com/v2/questions?limit=10&categories=${categoria}&difficulty=${dificultad}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Error al obtener las preguntas");
        const data = await res.json();

        const preguntasTraducidas = await Promise.all(
          data.map(async (pregunta) => {
            const preguntaTexto = await traducirTexto(pregunta.question.text, idioma);

            const respuestas = [
              pregunta.correctAnswer,
              ...pregunta.incorrectAnswers,
            ];

            const respuestasTraducidas = await Promise.all(
              respuestas.map((r) => traducirTexto(r, idioma))
            );

            return {
              ...pregunta,
              question: { text: preguntaTexto },
              correctAnswer: respuestasTraducidas[0],
              incorrectAnswers: respuestasTraducidas.slice(1),
            };
          })
        );

        setPreguntas(prepararPreguntas(preguntasTraducidas));
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerPreguntas();
  }, []);

  const totalPreguntas = preguntas.length;
  const preguntaActualNumero = indiceActual + 1;
  const progresoPorcentaje = calcularPorcentaje(preguntaActualNumero, totalPreguntas);
  const porcentajePuntaje = calcularPorcentaje(puntaje, totalPreguntas);

  if (cargando) return <main className="game-page"><p role="status">{t.loading}</p></main>;
  if (error) return <main className="game-page"><p role="alert">{t.error} {error}</p></main>;

  if (indiceActual >= preguntas.length) {
    return (
      <main className="game-page" style={{ textAlign: "center", justifyContent: "center" }}>
        <h2>{t.gameOver}</h2>
        <p>{t.finalScore} {puntaje}</p>
        <button
          className="btn-primary-custom"
          onClick={() =>
            navigate("/result", {
              state: { correct: puntaje, total: preguntas.length },
            })
          }
        >
          {t.viewResults}
        </button>
      </main>
    );
  }

  const preguntaActual = preguntas[indiceActual];

  if (!preguntaActual) return <main className="game-page"><p role="status">{t.loadingQuestion}</p></main>;

  const manejarRespuesta = (respuesta) => {
    if (disabled) return;
    setDisabled(true);
    setRespuestaCorrecta(preguntaActual.correctAnswer);

    if (respuesta === preguntaActual.correctAnswer) {
      setPuntaje((prev) => prev + 1);
    }

    setTimeout(() => {
      setIndiceActual((prev) => prev + 1);
      setDisabled(false);
      setRespuestaCorrecta(null);
    }, 2200);
  };

  const alTerminarTiempo = () => {
    if (disabled) return;
    setDisabled(true);
    setRespuestaCorrecta(preguntaActual.correctAnswer);

    setTimeout(() => {
      setIndiceActual((prev) => prev + 1);
      setDisabled(false);
      setRespuestaCorrecta(null);
    }, 2200);
  };

  return (
    <main className="game-page">
      <Timer key={indiceActual} tiempoInicial={difficultyTime(dificultad)} alTerminar={alTerminarTiempo} />

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
    </main>
  );
}
