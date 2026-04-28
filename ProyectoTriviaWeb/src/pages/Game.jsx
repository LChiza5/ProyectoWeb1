import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import AnswerOptions from "../components/AnswerOptions";
import ScoreBoard from "../components/ScoreBoard";
import Timer from "../components/Timer";
import Loader from "../components/Loader";
import InputCard from "../components/InputCard";
import { prepararPreguntas } from "../utils/gameHelpers";
import { calcularPorcentaje } from "../utils/math";
import { difficultyTime, difficultyQuestions } from "../utils/difficultyTime";
import { traducirTexto } from "../utils/translate";
import { UI } from "../utils/translations";
import correctSound from "../assets/sounds/correct.mp3";
import wrongSound from "../assets/sounds/incorrect.mp3";
import timeoutSound from "../assets/sounds/timeout.mp3";
import backgroundMusic from "../assets/sounds/background.mp3";

export default function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const usuario = location.state?.usuario;

  // 🔊 Audios (con useRef para que no se reinicien)
  const audioCorrecto = useRef(new Audio(correctSound));
  const audioIncorrecto = useRef(new Audio(wrongSound));
  const audioTiempo = useRef(new Audio(timeoutSound));
  const audioMusica = useRef(null);

  const [muteado, setMuteado] = useState(false);

  const categoria = location.state?.categoria || "history";
  const dificultad = location.state?.dificultad || "easy";
  const idioma = location.state?.idioma || "es";
  const t = UI[idioma];

  const [preguntas, setPreguntas] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [racha, setRacha] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [exiting, setExiting] = useState(false);
  const tiempoRestanteRef = useRef(difficultyTime(dificultad));

  // Musica de fondo
  useEffect(() => {
    const musica = new Audio(backgroundMusic);
    musica.loop = true;
    musica.volume = 0.35;
    audioMusica.current = musica;
    musica.play().catch(() => {});

    return () => {
      musica.pause();
      musica.currentTime = 0;
    };
  }, []);

  const toggleMute = () => {
    if (audioMusica.current) {
      audioMusica.current.muted = !audioMusica.current.muted;
      setMuteado((prev) => !prev);
    }
  };

  useEffect(() => {
    const obtenerPreguntas = async () => {
      try {
        const url = `https://the-trivia-api.com/v2/questions?limit=${difficultyQuestions(dificultad)}&categories=${categoria}&difficulty=${dificultad}`;

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

  if (cargando) return <main className="game-page"><Loader /></main>;
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
              state: { correct: puntaje, total: preguntas.length, puntuacion, idioma, usuario },
            })
          }
        >
          {t.viewResults}
        </button>
      </main>
    );
  }

  const preguntaActual = preguntas[indiceActual];

  if (!preguntaActual)
    return <main className="game-page"><p role="status">{t.loadingQuestion}</p></main>;

  // ✅ Manejar respuesta con sonido
  const manejarRespuesta = (respuesta) => {
    if (disabled) return;
    setDisabled(true);
    setRespuestaCorrecta(preguntaActual.correctAnswer);

    if (respuesta === preguntaActual.correctAnswer) {
      audioCorrecto.current.currentTime = 0;
      audioCorrecto.current.play();
      setPuntaje((prev) => prev + 1);
      setPuntuacion((prev) => prev + tiempoRestanteRef.current);
      setRacha((prev) => prev + 1);
    } else {
      audioIncorrecto.current.currentTime = 0;
      audioIncorrecto.current.play();
      setRacha(0);
    }

    setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        setIndiceActual((prev) => prev + 1);
        setDisabled(false);
        setRespuestaCorrecta(null);
        setExiting(false);
      }, 320);
    }, 1800);
  };

  // ✅ Tiempo terminado
  const alTerminarTiempo = () => {
    if (disabled) return;
    setDisabled(true);
    setRespuestaCorrecta(preguntaActual.correctAnswer);
    setRacha(0);

    setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        setIndiceActual((prev) => prev + 1);
        setDisabled(false);
        setRespuestaCorrecta(null);
        setExiting(false);
      }, 320);
    }, 1800);
  };

  return (
    <main className="game-page">
      <InputCard
      label={t.userLabel}
      value={usuario}
      disabled={true}
      />
      <button
        onClick={toggleMute}
        title={muteado ? "Activar música" : "Silenciar música"}
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "50%",
          width: "2.5rem",
          height: "2.5rem",
          cursor: "pointer",
          fontSize: "1.2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
        }}
      >
        {muteado ? "🔇" : "🔊"}
      </button>

      <Timer
        key={`timer-${indiceActual}`}
        tiempoInicial={difficultyTime(dificultad)}
        alTerminar={alTerminarTiempo}
        audioTiempo={audioTiempo}
        onTick={(t) => { tiempoRestanteRef.current = t; }}
      />

      <ScoreBoard
        current={preguntaActualNumero}
        total={totalPreguntas}
        score={puntaje}
        progressPercent={progresoPorcentaje}
        scorePercent={porcentajePuntaje}
        racha={racha}
        puntuacion={puntuacion}
      />

      <div key={`q-${indiceActual}`} className={`question-wrap${exiting ? " exiting" : ""}`}>
        <QuestionCard
          textoPregunta={preguntaActual.question.text}
        />
        <AnswerOptions
          opciones={preguntaActual.opciones}
          onSelect={manejarRespuesta}
          disabled={disabled}
          correctAnswer={respuestaCorrecta}
        />
      </div>
    </main>
  );
}
