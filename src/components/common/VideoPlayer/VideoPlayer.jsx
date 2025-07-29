export default function VideoPlayer() {
  return (
    <div className="video-wrap">
      <a 
        href="https://www.youtube.com/watch?v=..." 
        className="popup-youtube"
        onClick={(e) => {
          e.preventDefault();
          // Implementar modal de vídeo aqui
        }}
      >
        Assistir Vídeo
      </a>
    </div>
  );
}