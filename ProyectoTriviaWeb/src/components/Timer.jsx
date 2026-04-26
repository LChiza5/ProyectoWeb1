import { useEffect, useState } from "react";

export default function Timer({ tiempoInicial, alTerminar, audioTiempo }) {
  const [tiempo, setTiempo] = useState(tiempoInicial);

  // cuenta regresiva y gestion de sonido últimos 5 seg
  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempo((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  // avisa cuando llega a 0
  useEffect(() => {
  // ⏰ Últimos 5 segundos
  if (tiempo === 5 && audioTiempo) {
    audioTiempo.current.currentTime = 0;
    audioTiempo.current.play();
  }

  // ⛔ Tiempo terminado
  if (tiempo === 0) {
    if (audioTiempo) {
      audioTiempo.current.pause();
      audioTiempo.current.currentTime = 0;
    }

    if (alTerminar) {
      alTerminar();
    }
  }
}, [tiempo]); // eslint-disable-line react-hooks/exhaustive-deps

  let badgeClass = "badge rounded-pill fs-6 px-3 py-2 ";

  if (tiempo <= 5) {
    badgeClass += "bg-danger timer-danger";
  } else if (tiempo <= 10) {
    badgeClass += "bg-warning text-dark";
  } else {
    badgeClass += "bg-success";
  }

  return (
    <output
      className="d-flex justify-content-center"
      role="timer"
      aria-live="polite"
      aria-label={`Tiempo restante: ${tiempo} segundos`}
    >
      <span className={badgeClass}>
        ⏱ {tiempo}s
      </span>
    </output>
  );
}
