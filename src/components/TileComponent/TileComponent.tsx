import React, { FC } from "react";
import "./styles.scss";

interface ITileItem {
  id: string | number;
  file: string; // Путь к изображению
  alt: string; // Альтернативный текст для изображения
}

interface ITileProps {
  imagesData: ITileItem[];
}

const TileComponent: FC<ITileProps> = ({ imagesData }) => {
  return (
    <div className="tileContainer">
      {imagesData.map((item) => {
        return <img src={item.file}></img>;
      })}
    </div>
  );
};

export default TileComponent;
