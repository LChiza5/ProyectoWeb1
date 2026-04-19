import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";

export default function Category() {
  const [categoria, setCategoria] = useState("");
  const [dificultad, setDificultad] = useState("");
  const navigate = useNavigate();

  const iniciarJuego = (e) => {
    e.preventDefault();
    if (!categoria || !dificultad) {
      alert("Seleccioná categoría y dificultad");
      return;
    }
    navigate("/game", { state: { categoria, dificultad } });
  };

  return (
    <main className="category-page">
      <h1>Configurar partida</h1>

      <section className="card-custom" aria-label="Opciones de juego">
        <form onSubmit={iniciarJuego} noValidate>
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
              { value: "easy", label: "🟢 Fácil — 20s" },
              { value: "medium", label: "🟡 Media — 15s" },
              { value: "hard", label: "🔴 Difícil — 10s" }
            ]}
          />

          <button type="submit" className="btn-primary-custom">
            Comenzar juego
          </button>
        </form>
      </section>
    </main>
  );
}
