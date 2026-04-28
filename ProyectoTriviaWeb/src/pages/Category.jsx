import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import ErrorMessage from "../components/ErrorMessage";
import InputCard from "../components/InputCard";
import { difficultyQuestions } from "../utils/difficultyTime";
import { UI } from "../utils/translations";
export default function Category() {
  const [categoria, setCategoria] = useState("");
  const [dificultad, setDificultad] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const usuario = location.state?.usuario;

  const idioma = location.state?.idioma || "es";
  const t = UI[idioma];

  const iniciarJuego = (e) => {
    e.preventDefault();
    if (!categoria || !dificultad) {
      setError(t.categoryError);
      return;
    }
    setError("");
    navigate("/game", { state: { categoria, dificultad, idioma, usuario } });
  };

  return (
    <main className="category-page">
      <h1>{t.categoryTitle}</h1>

      <section className="card-custom" aria-label="Opciones de juego">
        <form onSubmit={iniciarJuego} noValidate>
          <ErrorMessage mensaje={error} />

          <CategoryCard
            label={t.categoryLabel}
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            options={[
              { value: "history",           label: `🏛 ${t.cat_history}` },
              { value: "science",           label: `🔬 ${t.cat_science}` },
              { value: "geography",         label: `🌍 ${t.cat_geography}` },
              { value: "sports",            label: `⚽ ${t.cat_sports}` },
              { value: "music",             label: `🎵 ${t.cat_music}` },
              { value: "film_and_tv",       label: `🎬 ${t.cat_film}` },
              { value: "arts_and_literature", label: `📚 ${t.cat_arts}` },
              { value: "general_knowledge", label: `🧠 ${t.cat_general}` },
              { value: "food_and_drink",    label: `🍕 ${t.cat_food}` },
            ]}
          />

          <CategoryCard
            label={t.difficultyLabel}
            id="dificultad"
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value)}
            options={[
              { value: "easy",   label: `🟢 ${t.diff_easy}   — 20s — ${difficultyQuestions("easy")} ${t.questions}` },
              { value: "medium", label: `🟡 ${t.diff_medium} — 15s — ${difficultyQuestions("medium")} ${t.questions}` },
              { value: "hard",   label: `🔴 ${t.diff_hard}   — 10s — ${difficultyQuestions("hard")} ${t.questions}` },
            ]}
          />

          <InputCard
            label={t.userLabel}
            value={usuario}
            disabled={true}
          />

          <button type="submit" className="btn-primary-custom">
            {t.startGame}
          </button>
        </form>
      </section>
    </main>
  );
}
