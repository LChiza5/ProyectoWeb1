import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../utils/firebase";
import { GoogleAuthProvider,GithubAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const loginGoogle = async () => {
    setCargando(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      navigate("/home", { state: { usuario: result.user.displayName } });
    } catch {
      setError("No se pudo iniciar sesión. Intenta de nuevo.");
      setCargando(false);
    }
  };

  const loginGithub = async () => {
    setCargando(true);
    setError("");
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      navigate("/home", { state: { usuario: result.user.reloadUserInfo.screenName || result.user.displayName || result.user.email } });
    } catch {
      setError("No se pudo iniciar sesión con GitHub.");
      setCargando(false);
    }
  };


  return (
    <main className="login-page">
      <div className="login-card">
        <p className="home-icon" aria-hidden="true">🧠</p>
        <h1>Quiztoso</h1>
        <p className="login-subtitle">Inicia sesión para comenzar a jugar</p>

        {error && (
          <p className="login-error" role="alert">{error}</p>
        )}

        <button
          className="btn-google"
          onClick={loginGoogle}
          disabled={cargando}
          aria-busy={cargando}
        >
          {cargando ? (
            "Iniciando sesión..."
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Continuar con Google
            </>
          )}
        </button>

        <button
          className="btn-google"
          onClick={loginGithub}
          disabled={cargando}
          aria-busy={cargando}
        >
          {cargando ? (
            "Iniciando sesión..."
          ) : (
            <>
          <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              >
            <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.19a10.9 10.9 0 0 1 5.74 0c2.19-1.5 3.15-1.19 3.15-1.19.62 1.58.23 2.75.11 3.04.73.81 1.18 1.85 1.18 3.11 0 4.43-2.69 5.4-5.25 5.69.41.35.78 1.05.78 2.12v3.15c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
          </svg>

      Continuar con GitHub
    </>
  )}
</button>
      </div>
    </main>
  );
}
