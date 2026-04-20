import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputCard from "../components/InputCard";

export default function Home() {
  const [usuario, setUsuario] = useState("Usuario");
  const navigate = useNavigate();

  return (
    <main className="home-hero">
      <p className="home-icon" aria-hidden="true">🧠</p>
      <h1>Quiztoso</h1>
      <p className="home-subtitle">
        Poné a prueba tu cultura general con preguntas de todo el mundo
      </p>
      <nav className="home-actions" aria-label="Acciones principales">

        <InputCard 
          label="Usuario"
          id="usuario"
          placeholder="Escriba su usuario"
        ></InputCard>

        <button className="btn-primary-custom" onClick={() => navigate("/category")}>
          Jugar ahora
        </button>
        {/* <button className="btn-secondary-custom" onClick={() => navigate("/login")}>
          Iniciar sesión
        </button> */}
      </nav>
    </main>
  );
}
