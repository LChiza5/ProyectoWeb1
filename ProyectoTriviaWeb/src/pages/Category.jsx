import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import ErrorMessage from "../components/ErrorMessage";
import InputCard from "../components/InputCard";
import { difficultyQuestions } from "../utils/difficultyTime";

export default function Category() {
  const [categoria, setCategoria] = useState("");
  const [dificultad, setDificultad] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const usuario = location.state?.usuario;

  const idioma = location.state?.idioma || "es";

  const iniciarJuego = (e) => {
    e.preventDefault();
    if (!categoria || !dificultad) {
      setError("Seleccioná categoría y dificultad");
      return;
    }

    setError(""); // limpiar error si todo está bien
    navigate("/game", { state: { categoria, dificultad, idioma, usuario } });
  };

  return (
    <main className="category-page">
      
      <h1>Configurar partida</h1>

      <section className="card-custom" aria-label="Opciones de juego">
        <form onSubmit={iniciarJuego} noValidate>

            <ErrorMessage mensaje={error} />

          <CategoryCard
              label="Categoría"
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
               options={[
              { value: "history", label: "🏛 Historia" },
              { value: "science", label: "🔬 Ciencia" },
              { value: "sports", label: "⚽ Deportes" },
              { value: "music", label: "🎵 Música" }
            ]}
          />

          <CategoryCard
              label="Dificultad"
              id="dificultad"
              value={dificultad}
              onChange={(e) => setDificultad(e.target.value)}
              options={[
              { value: "easy", label: `🟢 Fácil — 20s — ${difficultyQuestions("easy")} preguntas` },
              { value: "medium", label: `🟡 Media — 15s — ${difficultyQuestions("medium")} preguntas` },
              { value: "hard", label: `🔴 Difícil — 10s — ${difficultyQuestions("hard")} preguntas` },
            ]}
          />
          
          <InputCard
          value={usuario}
          disabled={true}
          />

          <button type="submit" className="btn-primary-custom">
            Comenzar juego
          </button>
        </form>
      </section>
    </main>
  );
}
