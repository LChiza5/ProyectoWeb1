import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/category')}>Jugar</button>
      <button onClick={() => navigate('/login')}>Iniciar Sesión</button>
    </div>
  );
}
