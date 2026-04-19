const TIEMPOS = {
  easy: 20,
  medium: 15,
  hard: 10,
};

export function difficultyTime(dificultad) {
  return TIEMPOS[dificultad] ?? 15;
}
