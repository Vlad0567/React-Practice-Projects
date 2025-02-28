import useWindowSize from "./useWindowSize"
import "./WindowSize.css";

const WindowSize = () => {
  const { width, height, isMobile } = useWindowSize();

  return (
    <div className="container">
      <h1>Размер окна</h1>
      <p>
        Ширина: <strong>{width}px</strong>
      </p>
      <p>
        Высота: <strong>{height}px</strong>
      </p>
      <p className={`status ${isMobile ? "mobile" : "desktop"}`}>
        {isMobile ? "📱 Мобильный режим" : "💻 Десктопный режим"}
      </p>
    </div>
  );
};

export default WindowSize;
