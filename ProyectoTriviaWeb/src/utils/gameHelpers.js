import { shuffleArray } from "./shuffleArray";

export function prepararPreguntas(data) {
  return data.map((q) => ({
    ...q,
    opciones: shuffleArray([...q.incorrectAnswers, q.correctAnswer]),
  }));
}
