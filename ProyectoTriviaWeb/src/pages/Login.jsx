import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {

  const navigate = useNavigate();
  const loginGoogle = async () => {

    const provider = new GoogleAuthProvider();

  try {

    const result = await signInWithPopup(auth, provider);

    navigate("/home", {
      state: {
      usuario: result.user.displayName
    }
    });

  } catch (error) {
    console.error(error);
  }
  };

  return (
    <button onClick={loginGoogle}>
      Login con Google
    </button>
  );
}
