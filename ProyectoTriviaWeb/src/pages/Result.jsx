import { useNavigate, useLocation } from "react-router-dom";
import { calculateStats } from "../utils/calculateStats";
import { UI } from "../utils/translations";
import InputCard from "../components/InputCard";
function getEmoji(percent) {
  if (percent === 100) return "🏆";
  if (percent >= 70) return "🎉";
  if (percent >= 40) return "👍";
  return "📚";
}

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const usuario = state?.usuario;

  const idioma = state?.idioma || "es";
  const t = UI[idioma];
  const puntuacion = state?.puntuacion ?? 0;

  const { correct, total, percent } = calculateStats(
    state?.correct || 0,
    state?.total || 0
  );

  const nombre = usuario || "Alguien";
  const mensaje = `${nombre} obtuvo ${correct}/${total} en Quiztoso. ¿Podés superarlo? 🧠 Jugá aquí: ${window.location.origin}`;

  const compartirWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  const compartirTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  const compartirFacebook = () => {
    window.open("https://www.facebook.com/", "_blank");
  };

  return (
    <main className="result-page">
      <p className="result-emoji" aria-hidden="true">{getEmoji(percent)}</p>
      <h1>{t.resultTitle}</h1>
                <InputCard
                label={t.userLabel}
                value={usuario}
                disabled={true}
                />
      <figure className="result-score-ring" aria-label={`Puntaje: ${percent}%`}>
        <strong className="result-percent">{percent}%</strong>
        <figcaption className="result-label">{t.accuracy}</figcaption>
      </figure>

      <dl className="result-detail">
        <div className="result-row">
          <dt>{t.totalQuestions}</dt>
          <dd>{total}</dd>
        </div>
        <div className="result-row">
          <dt>{t.correctAnswers}</dt>
          <dd>{correct}</dd>
        </div>
        <div className="result-row">
          <dt>{t.incorrectAnswers}</dt>
          <dd>{total - correct}</dd>
        </div>
        <div className="result-row">
          <dt>{t.bonusScore}</dt>
          <dd>{puntuacion} pts</dd>
        </div>
      </dl>

      <nav className="home-actions" aria-label="Continuar">
        <button className="btn-primary-custom" onClick={() => navigate("/category")}>
          {t.playAgain}
        </button>
        <button className="btn-secondary-custom" onClick={() => navigate("/home", { state: { usuario, idioma } })}>
          {t.goHome}
        </button>
        <h2>{t.shareTitle}</h2>
        <button onClick={compartirWhatsApp} className="btn-primary-custom">
          {t.shareWhatsApp}
        </button>
        <button onClick={compartirTwitter} className="btn-primary-custom">
          {t.shareTwitter}
        </button>
        <button onClick={compartirFacebook} className="btn-primary-custom">
          {t.shareFacebook}
        </button>
      </nav>
    </main>
  );
}
