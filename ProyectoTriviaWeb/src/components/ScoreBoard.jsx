export default function ScoreBoard({ puntaje }) {
  return (
    <section className="d-flex justify-content-between bg-light p-2 rounded mb-3 shadow-sm">

      <span>⭐ {puntaje}</span>

      <span>
        📍 {puntaje ? "" : ""} {/* lo puedes mejorar luego */}
      </span>

      <span>
        🎯 {puntaje}
      </span>

    </section>
  );
}