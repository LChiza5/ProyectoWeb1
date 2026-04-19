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
  }, [tiempo]); 

  return (
    <div>
      <h3>Tiempo: {tiempo}s</h3>
    </div>
  );
}
