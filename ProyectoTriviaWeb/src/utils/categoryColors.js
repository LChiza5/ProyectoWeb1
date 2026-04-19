const COLORES = {
  history: "danger",
  science: "success",
  sports: "warning",
  music: "info",
};

export function categoryColors(categoria) {
  return COLORES[categoria] ?? "secondary";
}
