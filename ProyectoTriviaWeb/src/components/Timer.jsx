import { useEffect, useState } from "react";

export default function Timer({ tiempoInicial, alTerminar, audioTiempo, onTick }) {
  const [tiempo, setTiempo] = useState(tiempoInicial);

  // Cuenta regresiva
  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempo((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  // Reporta tiempo restante al padre
  useEffect(() => {
    if (onTick) onTick(tiempo);
  }, [tiempo]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sonido y fin de tiempo
  useEffect(() => {
    if (tiempo === 5 && audioTiempo) {
      audioTiempo.current.currentTime = 0;
      audioTiempo.current.play();
    }
    if (tiempo === 0) {
      if (audioTiempo) {
        audioTiempo.current.pause();
        audioTiempo.current.currentTime = 0;
      }
      if (alTerminar) alTerminar();
    }
  }, [tiempo]); // eslint-disable-line react-hooks/exhaustive-deps

  const percent = Math.round((tiempo / tiempoInicial) * 100);

  let badgeClass = "timer-badge ";
  let barClass = "timer-bar ";
  if (percent <= 25) {
    badgeClass += "timer-badge--danger";
    barClass += "timer-bar--danger";
  } else if (percent <= 50) {
    badgeClass += "timer-badge--warn";
    barClass += "timer-bar--warn";
  } else {
    badgeClass += "timer-badge--safe";
    barClass += "timer-bar--safe";
  }

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label={`Tiempo restante: ${tiempo} segundos`}
      className="timer-wrap"
    >
      <span className={badgeClass}>
        ⏱ {tiempo}s
      </span>
      <div className="timer-bar-track">
        <div
          className={barClass}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
