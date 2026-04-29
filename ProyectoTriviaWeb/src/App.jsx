import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState,useRef } from 'react';
import Home from './pages/Home';
import Category from './pages/Category';
import Game from './pages/Game';
import Result from './pages/Result';
import Login from './pages/Login';
import menuSound from "./assets/sounds/menuSound.mp3"

function AudioController() {
  const audioRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!audioRef.current) return;

    if (location.pathname !== "/game") {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [location]);

  useEffect(() => {
    const startAudio = () => {
      audioRef.current?.play().catch(() => {});
    };

    document.addEventListener("click", startAudio, { once: true });

    return () => document.removeEventListener("click", startAudio);
  }, []);

  return <audio ref={audioRef} src={menuSound} loop />;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <AudioController /> {/* 👈 AQUI VA */}

      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/game" element={<Game />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

