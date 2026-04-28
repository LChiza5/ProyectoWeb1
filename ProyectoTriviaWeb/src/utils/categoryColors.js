const COLORES = {
  history: "danger",
  science: "success",
  sports: "warning",
  music: "info",
};

const LABELS = {
  history: { es: "Historia", en: "History" },
  science: { es: "Ciencia", en: "Science" },
  sports: { es: "Deportes", en: "Sports" },
  music:   { es: "Música",   en: "Music"    },
};

export function categoryColors(categoria) {
  return COLORES[categoria] ?? "secondary";
}

export function categoryLabel(categoria, idioma = "es") {
  return LABELS[categoria]?.[idioma] ?? categoria;
}
