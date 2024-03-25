import React, { FC, useState } from "react";
import "./styles.scss";
import icons from "../../assets/icons/icons";
import Buttons from "../Buttons/Buttons";

interface ISliderItem {
  id: string | number;
  file: string; // Путь к изображению
  alt: string; // Альтернативный текст для изображения
}

interface ISliderProps {
  items: ISliderItem[];
}

const Slider: FC<ISliderProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const openFullscreen = (element: any) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* IE/Edge */
      element.msRequestFullscreen();
    }
  };

  if (!items || items.length === 0) {
    return null; // Если нет элементов для слайдера, просто вернем null
  }

  const filteredItems = items.filter((_, index) => index !== activeIndex);

  return (
    <div className="slider">
      <div className="main-image">
        <img src={items[activeIndex].file} alt={items[activeIndex].alt} />
        {/* <button
          onClick={() =>
            openFullscreen(document.querySelector(".main-image img"))
          }
        >
          Open Fullscreen
        </button> */}
      </div>
      <div className="thumbnails">
        {filteredItems.map((item) => (
          <img
            key={item.id}
            src={item.file}
            alt={item.alt}
            className="thumbnail"
            onClick={() => setActiveIndex(items.indexOf(item))}
          />
        ))}
      </div>
      <div className="buttonContainerSlider">
        <Buttons
          ico={icons.arrowLeft}
          onClick={handlePrevSlide}
          text={""}
          className="slideButton"
        />
        <Buttons
          ico={icons.arrowRight}
          onClick={handleNextSlide}
          text={""}
          className="slideButton"
        />
      </div>
    </div>
  );
};

export default Slider;
