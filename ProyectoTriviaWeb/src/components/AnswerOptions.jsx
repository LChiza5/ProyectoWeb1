export default function AnswerOptions({ opciones, manejarRespuesta }) {
  return (
    <ul>
      {opciones.map((opcion, index) => (
        <li key={index}>
          <button onClick={() => manejarRespuesta(opcion)}>{opcion}</button>
        </li>
      ))}
    </ul>
  );
}
