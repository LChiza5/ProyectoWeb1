import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import InputCard from "../components/InputCard";
import { UI } from "../utils/translations";

export default function Home() {
  const [idioma, setIdioma] = useState("es");
  const navigate = useNavigate();
  const location = useLocation();
  const t = UI[idioma];
  const usuario = location.state?.usuario;

  return (
    <main className="home-hero">
      <p className="home-icon" aria-hidden="true">&#129504;</p>
      <h1>Quiztoso</h1>
      <p className="home-subtitle">{t.subtitle}</p>

      <div className="language-selector">
        <button
          className={idioma === "es" ? "btn-primary-custom" : "btn-secondary-custom"}
          onClick={() => setIdioma("es")}
        >
          Español
        </button>
        <button
          className={idioma === "en" ? "btn-primary-custom" : "btn-secondary-custom"}
          onClick={() => setIdioma("en")}
        >
          English
        </button>
      </div>

      <nav className="home-actions" aria-label="Acciones principales">
        <InputCard
          label={t.userLabel}
          id="usuario"
          placeholder={t.userPlaceholder}
          value={usuario}
          disabled={true}
        />
        <button
          className="btn-primary-custom"
          onClick={() => navigate("/category", { state: { idioma, usuario } })}
        >
          {t.playButton}
        </button>
      </nav>
    </main>
  );
}
