import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Quiztoso</h1>

      <button onClick={() => navigate("/category")}>
        Jugar
      </button>

      <button onClick={() => navigate("/login")}>
        Login
      </button>
    </div>
  );
}