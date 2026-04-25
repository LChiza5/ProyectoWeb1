// Traduce un texto del inglés al idioma destino usando MyMemory API (gratis, sin API key)
// Si el idioma destino es inglés, devuelve el texto original sin hacer ninguna llamada
export const traducirTexto = async (texto, targetLang = "es") => {
  if (targetLang === "en") return texto;

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|${targetLang}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error en traducción");
    const data = await res.json();
    return data.responseData?.translatedText || texto;
  } catch (error) {
    console.error("Error al traducir:", error);
    return texto;
  }
};
