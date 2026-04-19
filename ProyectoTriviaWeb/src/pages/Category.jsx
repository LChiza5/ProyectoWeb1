import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
          <p className="form-group">
            <label className="form-label" htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              className="form-select-custom"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">— Elegir —</option>
              <option value="history">🏛 Historia</option>
              <option value="science">🔬 Ciencia</option>
              <option value="sports">⚽ Deportes</option>
              <option value="music">🎵 Música</option>
            </select>
          </p>

          <p className="form-group">
            <label className="form-label" htmlFor="dificultad">Dificultad</label>
            <select
              id="dificultad"
              className="form-select-custom"
              value={dificultad}
              onChange={(e) => setDificultad(e.target.value)}
            >
              <option value="">— Elegir —</option>
              <option value="easy">🟢 Fácil — 20s</option>
              <option value="medium">🟡 Media — 15s</option>
              <option value="hard">🔴 Difícil — 10s</option>
            </select>
          </p>

          <button type="submit" className="btn-primary-custom">
            Comenzar juego
          </button>
        </form>
      </section>
    </main>
  );
}
