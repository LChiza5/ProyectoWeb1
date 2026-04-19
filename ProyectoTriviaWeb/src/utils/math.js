export function calcularPorcentaje(correctas, total) {
  if (!total) return 0;
  return Math.round((correctas / total) * 100);
}
