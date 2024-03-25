// CustomCursor.tsx
import React, { useEffect, useState } from "react";
import "./styles.scss"; // Создайте файл стилей для курсора

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", updateCursorPosition);

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{ left: `${position.x - 120}px`, top: `${position.y - 120}px` }}
    >
      <div className="inner-circle"></div>
    </div>
  );
};

export default CustomCursor;
