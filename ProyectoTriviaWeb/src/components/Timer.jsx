import { useEffect, useState } from "react";

export default function Timer({ tiempoInicial, alTerminar }) {
  const [tiempo, setTiempo] = useState(tiempoInicial);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempo((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (tiempo === 0 && alTerminar) {
      alTerminar();
    }
  }, [tiempo]); // eslint-disable-line react-hooks/exhaustive-deps

  const timerClass =
    tiempo <= 5 ? "timer timer-danger" :
    tiempo <= 10 ? "timer timer-warning" :
    "timer";

  return (
    <output
      className={timerClass}
      role="timer"
      aria-live="polite"
      aria-label={`Tiempo restante: ${tiempo} segundos`}
    >
      <span aria-hidden="true">⏱</span>
      <span>{tiempo}s</span>
    </output>
  );
}
