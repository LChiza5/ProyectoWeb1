const TIEMPOS = {
  easy: 20,
  medium: 15,
  hard: 10,
};

const PREGUNTAS = {
  easy: 10,
  medium: 15,
  hard: 20,
};

export function difficultyTime(dificultad) {
  return TIEMPOS[dificultad] ?? 15;
}

export function difficultyQuestions(dificultad) {
  return PREGUNTAS[dificultad] ?? 10;
}
