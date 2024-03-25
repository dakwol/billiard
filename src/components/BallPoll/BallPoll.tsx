import React, { Fragment, useEffect, useRef, useState } from "react";
import "./styles.scss";
import ColorPicker from "../ColorPicker/ColorPicker";

interface Ball {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocityX: number;
  velocityY: number;
}

const BallPoll = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const balls = useRef<Ball[]>([]);
  const draggingBallIndex = useRef<number | null>(null);
  const offsetX = useRef<number>(0);
  const offsetY = useRef<number>(0);

  const [ballsInPocket, setBallsInPocket] = useState<number>(0);
  const [selectedBallIndex, setSelectedBallIndex] = useState<number | null>(
    null
  );
  const [colorPickerVisible, setColorPickerVisible] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Функция для обновления положения шаров
    const updateBallsPosition = () => {
      balls.current.forEach((ball, index) => {
        // Уменьшаем скорость шаров со временем
        ball.velocityX *= 0.99;
        ball.velocityY *= 0.99;

        ball.x += ball.velocityX;
        ball.y += ball.velocityY;

        if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
          ball.velocityX *= -1;
        }
        if (
          ball.y + ball.radius >= canvas.height ||
          ball.y - ball.radius <= 0
        ) {
          ball.velocityY *= -1;
        }

        // Проверка на попадание в лунку
        const pocketRadius = 20;
        const pockets = [
          { x: pocketRadius, y: pocketRadius },
          { x: canvas.width / 2, y: pocketRadius },
          { x: canvas.width - pocketRadius, y: pocketRadius },
          { x: pocketRadius, y: canvas.height - pocketRadius },
          { x: canvas.width / 2, y: canvas.height - pocketRadius },
          { x: canvas.width - pocketRadius, y: canvas.height - pocketRadius },
        ];
        pockets.forEach((pocket) => {
          const dx = ball.x - pocket.x;
          const dy = ball.y - pocket.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance <= ball.radius + pocketRadius) {
            // Удаляем шарик из массива шаров
            balls.current.splice(index, 1);
            setBallsInPocket((prevCount) => prevCount + 1);
          }
        });

        balls.current.forEach((otherBall, otherIndex) => {
          if (index !== otherIndex) {
            const dx = otherBall.x - ball.x;
            const dy = otherBall.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < ball.radius + otherBall.radius) {
              const angle = Math.atan2(dy, dx);
              const sin = Math.sin(angle);
              const cos = Math.cos(angle);

              const vx1 = ball.velocityX * cos + ball.velocityY * sin;
              const vy1 = ball.velocityY * cos - ball.velocityX * sin;
              const vx2 = otherBall.velocityX * cos + otherBall.velocityY * sin;
              const vy2 = otherBall.velocityY * cos - otherBall.velocityX * sin;

              const finalVelocityX1 =
                ((ball.radius - otherBall.radius) * vx1 +
                  (otherBall.radius + ball.radius) * vx2) /
                (ball.radius + otherBall.radius);
              const finalVelocityX2 =
                ((ball.radius + otherBall.radius) * vx1 +
                  (otherBall.radius - ball.radius) * vx2) /
                (ball.radius + otherBall.radius);

              ball.velocityX = finalVelocityX1 * cos - vy1 * sin;
              ball.velocityY = vy1 * cos + finalVelocityX1 * sin;
              otherBall.velocityX = finalVelocityX2 * cos - vy2 * sin;
              otherBall.velocityY = vy2 * cos + finalVelocityX2 * sin;
            }
          }
        });
      });
    };

    // Функция для отрисовки
    const redrawCanvas = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Рисуем стол
      context.fillStyle = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--body-color");
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.strokeStyle = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--white");
      context.lineWidth = 2;
      context.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

      // Рисуем лункu
      const pocketRadius = 20;
      context.fillStyle = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--body-color");
      context.strokeStyle = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--white");
      context.lineWidth = 2;
      const pockets = [
        { x: pocketRadius, y: pocketRadius },
        { x: canvas.width / 2, y: pocketRadius },
        { x: canvas.width - pocketRadius, y: pocketRadius },
        { x: pocketRadius, y: canvas.height - pocketRadius },
        { x: canvas.width / 2, y: canvas.height - pocketRadius },
        { x: canvas.width - pocketRadius, y: canvas.height - pocketRadius },
      ];
      pockets.forEach((pocket) => {
        context.beginPath();
        context.arc(pocket.x, pocket.y, pocketRadius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        context.closePath();
      });

      // Рисуем шары
      balls.current.forEach((ball) => {
        context.beginPath();
        context.fillStyle = ball.color;
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        context.fill();
        context.closePath();
      });
    };

    const randomColor = (): string => {
      let result = "";
      for (let i = 0; i < 6; ++i) {
        const value = Math.floor(16 * Math.random());
        result += value.toString(16);
      }
      return "#" + result;
    };

    // Функция анимации
    const animate = () => {
      updateBallsPosition();
      redrawCanvas();
      requestAnimationFrame(animate);
    };

    // Создаем шары в виде треугольника
    const numBalls = 4;
    const ballRadius = 15;
    const distanceBetweenBalls = 2 * ballRadius * Math.cos(Math.PI / 2.5); // Расстояние между шарами

    const rotationAngle = Math.PI / 4; // 45 градусов в радианах

    // Высота треугольника
    const triangleHeight = numBalls * (2 * ballRadius + distanceBetweenBalls);

    // Центрирование
    const centerYOffset = (canvas.height - triangleHeight) / 2;
    const centerXOffset = (canvas.width - triangleHeight) / 2;

    for (let col = 0; col < numBalls; col++) {
      for (let row = numBalls - 1; row >= col; row--) {
        // Исходные координаты
        const originalX =
          ballRadius + col * (2 * ballRadius + distanceBetweenBalls);
        const originalY =
          ballRadius + row * (2 * ballRadius + distanceBetweenBalls);

        // Матрица поворота
        const rotatedX =
          originalX * Math.cos(rotationAngle) -
          originalY * Math.sin(rotationAngle);
        const rotatedY =
          originalX * Math.sin(rotationAngle) +
          originalY * Math.cos(rotationAngle);

        const y = rotatedY + centerYOffset;
        const x = rotatedX + centerXOffset;
        const color = randomColor();
        const velocityX = 0;
        const velocityY = 0;

        const duplicateBall = balls.current.find(
          (ball) => ball.x === x && ball.y === y
        );
        if (!duplicateBall) {
          balls.current.push({
            x,
            y,
            radius: ballRadius,
            color,
            velocityX,
            velocityY,
          });
        }
      }
    }

    // Запускаем анимацию
    animate();

    const getMousePosition = (event: MouseEvent): { x: number; y: number } => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };
    const handleMouseDown = (event: MouseEvent) => {
      const mousePosition = getMousePosition(event);
      balls.current.forEach((ball, index) => {
        const dx = mousePosition.x - ball.x;
        const dy = mousePosition.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= ball.radius) {
          setSelectedBallIndex(index);
          setColorPickerVisible(false);
          draggingBallIndex.current = index;
          offsetX.current = dx;
          offsetY.current = dy;
        }
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (draggingBallIndex.current !== null) {
        const mousePosition = getMousePosition(event);
        const dx = mousePosition.x - balls.current[draggingBallIndex.current].x;
        const dy = mousePosition.y - balls.current[draggingBallIndex.current].y;
        const angle = Math.atan2(dy, dx);
        balls.current[draggingBallIndex.current].velocityX =
          Math.cos(angle) * 5;
        balls.current[draggingBallIndex.current].velocityY =
          Math.sin(angle) * 5;
        redrawCanvas();
      }
    };

    const handleMouseUp = () => {
      if (draggingBallIndex.current !== null) {
        draggingBallIndex.current = null;
      }
    };

    const handlePickerVisible = () => {
      setColorPickerVisible(true);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("dblclick", handlePickerVisible);

    return () => {
      //@ts-ignore
      cancelAnimationFrame(animate);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleColorChange = (color: string) => {
    if (selectedBallIndex !== null) {
      balls.current[selectedBallIndex].color = color;
      setColorPickerVisible(false);
    }
  };

  const colorPickerStyle: React.CSSProperties = {
    position: "absolute",
    //@ts-ignore
    top: balls.current[selectedBallIndex]?.y || 0,
    //@ts-ignore
    left: balls.current[selectedBallIndex]?.x || 0,
    zIndex: 999,
    display: colorPickerVisible ? "block" : "none",
  };

  return (
    <Fragment>
      <h1 className="titleCounter">{ballsInPocket}</h1>

      <canvas ref={canvasRef} width={1000} height={600} />
      <h5 className="subTitleCounter">Двойной клик для измения цвета шара</h5>
      <div style={colorPickerStyle}>
        {selectedBallIndex !== null && (
          <ColorPicker onSelectColor={handleColorChange} />
        )}
      </div>
    </Fragment>
  );
};

export default BallPoll;
