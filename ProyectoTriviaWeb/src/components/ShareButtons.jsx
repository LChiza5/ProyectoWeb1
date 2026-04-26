export default function ShareButtons({ text = "", url = "" }) {
  const encoded = encodeURIComponent(`${text} ${url}`);

  return (
    <nav className="d-flex gap-2 justify-content-center flex-wrap" aria-label="Compartir resultado">
      <a
        className="btn btn-outline-primary rounded-3 px-4 fw-semibold share-btn"
        href={`https://twitter.com/intent/tweet?text=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        🐦 Twitter / X
      </a>
      <a
        className="btn btn-outline-success rounded-3 px-4 fw-semibold share-btn"
        href={`https://wa.me/?text=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        💬 WhatsApp
      </a>
    </nav>
  );
}
