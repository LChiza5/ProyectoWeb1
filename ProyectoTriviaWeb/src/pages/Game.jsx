import { useState, useEffect } from "react";

const URL_API = "https://the-trivia-api.com/v2/questions?limit=10";

export default function Juego() {
  const [preguntas, setPreguntas] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(URL_API)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error al obtener las preguntas");
        }
        return respuesta.json();
      })
      .then((data) => {
        setPreguntas(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <div>Cargando preguntas...</div>;
  }

  if (error) {
    return <div>Ocurrió un error: {error}</div>;
  }

  if (indiceActual >= preguntas.length) {
    return (
      <div>
        <h2>Juego terminado</h2>
        <p>Puntaje final: {puntaje}</p>
      </div>
    );
  }

  const preguntaActual = preguntas[indiceActual];

  const opciones = [
    ...preguntaActual.incorrectAnswers,
    preguntaActual.correctAnswer,
  ];

  const manejarRespuesta = (respuestaSeleccionada) => {
    if (respuestaSeleccionada === preguntaActual.correctAnswer) {
      setPuntaje((prev) => prev + 1);
    }

    setIndiceActual((prev) => prev + 1);
  };

  return (
    <div>
      <h2>Pregunta {indiceActual + 1}</h2>

      <p>{preguntaActual.question.text}</p>

      <ul>
        {opciones.map((opcion, index) => (
          <li key={index}>
            <button onClick={() => manejarRespuesta(opcion)}>
              {opcion}
            </button>
          </li>
        ))}
      </ul>

      <p>Puntaje: {puntaje}</p>
    </div>
  );
}