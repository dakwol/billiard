import React, { FC } from "react";
import "./styles.scss";

interface ColorPickerProps {
  onSelectColor: (color: string) => void;
}

const ColorPicker: FC<ColorPickerProps> = ({ onSelectColor }) => {
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
  ];

  return (
    <div className="colorPicker">
      {colors.map((color, index) => (
        <div
          key={index}
          className="colorOption"
          style={{ backgroundColor: color }}
          onClick={() => onSelectColor(color)}
        />
      ))}
    </div>
  );
};
export default ColorPicker;
