import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const [categoria, setCategoria] = useState("");
  const [dificultad, setDificultad] = useState("");
  const navigate = useNavigate();

  const iniciarJuego = () => {
    if (!categoria || !dificultad) {
      alert("Seleccione categoría y dificultad");
      return;
    }

    navigate("/game", {
      state: { categoria, dificultad },
    });
  };

  return (
    <main>
      <header>
        <h1>Configurar Juego</h1>
      </header>

      <section>
        <form>
          <fieldset>
            <legend>Selecciona una categoría</legend>

            <label htmlFor="categoria">Categoría:</label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">-- Seleccionar --</option>
              <option value="history">Historia</option>
              <option value="science">Ciencia</option>
              <option value="sports">Deportes</option>
              <option value="music">Música</option>
            </select>
          </fieldset>
          <fieldset>
            <legend>Selecciona dificultad</legend>

            <label htmlFor="dificultad">Dificultad:</label>
            <select
              id="dificultad"
              value={dificultad}
              onChange={(e) => setDificultad(e.target.value)}
            >
              <option value="">-- Seleccionar --</option>
              <option value="easy">Fácil</option>
              <option value="medium">Media</option>
              <option value="hard">Difícil</option>
            </select>
          </fieldset>

          <button type="button" onClick={iniciarJuego}>
            Iniciar Juego
          </button>
        </form>
      </section>
    </main>
  );
}