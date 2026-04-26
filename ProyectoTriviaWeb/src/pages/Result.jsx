import { useNavigate, useLocation } from "react-router-dom";
import { calculateStats } from "../utils/calculateStats";

function getEmoji(percent) {
  if (percent === 100) return "🏆";
  if (percent >= 70) return "🎉";
  if (percent >= 40) return "👍";
  return "📚";
}

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { correct, total, percent } = calculateStats(
    state?.correct || 0,
    state?.total || 0
  );

  const mensaje = `Obtuve ${correct} de ${total} en el juego de trivia. ¿Puedes superarme? Juega aquí: https://PROYECTOTRIVIA.com`;

  const compartirWhatsApp = () => {
  const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
  };

  const compartirTwitter = () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
};

//Enlace de Facebook funciona solo si la página está online, no funciona si solo está en local, se le coloca link temporal.
  const compartirFacebook = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(mensaje)}`;
  window.open("https://www.facebook.com/", "_blank");
  };

  return (
    <main className="result-page">
      <p className="result-emoji" aria-hidden="true">{getEmoji(percent)}</p>
      <h1>Resultado final</h1>

      <figure className="result-score-ring" aria-label={`Puntaje: ${percent}%`}>
        <strong className="result-percent">{percent}%</strong>
        <figcaption className="result-label">aciertos</figcaption>
      </figure>

      <dl className="result-detail">
        <div className="result-row">
          <dt>Preguntas totales</dt>
          <dd>{total}</dd>
        </div>
        <div className="result-row">
          <dt>Respuestas correctas</dt>
          <dd>{correct}</dd>
        </div>
        <div className="result-row">
          <dt>Respuestas incorrectas</dt>
          <dd>{total - correct}</dd>
        </div>
      </dl>

      <nav className="home-actions" aria-label="Continuar">
        <button className="btn-primary-custom" onClick={() => navigate("/category")}>
          Jugar de nuevo
        </button>
      <button className="btn-secondary-custom" onClick={() => navigate("/")}>
          Ir al inicio
        </button>
        <h2>Comparte tu resultado y reta a tus amigos😎</h2>
        <button onClick={compartirWhatsApp} className="btn-primary-custom">
          Compartir en WhatsApp
        </button>
        <button onClick={compartirTwitter} className="btn-primary-custom">
          Compartir en Twitter
        </button>
        <button onClick={compartirFacebook} className="btn-primary-custom">
          Compartir en Facebook
        </button>
        
      </nav>
    </main>
  );
}
