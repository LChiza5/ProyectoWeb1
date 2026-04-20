export const traducirTexto = async (texto, target = "es") => {
  try {
    const res = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: texto,
        source: "en",
        target: target,
        format: "text",
      }),
    });

    if (!res.ok) throw new Error("Error en traducción");

    const data = await res.json();

    return data.translatedText || texto;
  } catch (error) {
    console.error("Error al traducir:", error);
    return texto;
  }
};