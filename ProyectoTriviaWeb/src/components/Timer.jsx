import { useEffect, useState } from "react";

export default function Timer({ tiempoInicial, alTerminar, reset }) {
  const [tiempo, setTiempo] = useState(tiempoInicial);

  useEffect(() => {
    setTiempo(tiempoInicial);
  }, [reset, tiempoInicial]);

  useEffect(() => {
    if (tiempo <= 0) {
      if (alTerminar) alTerminar();
      return;
    }

    const intervalo = setInterval(() => {
      setTiempo((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempo, alTerminar]);

  return (
    <div>
      <h3>Tiempo: {tiempo}s</h3>
    </div>
  );
}
