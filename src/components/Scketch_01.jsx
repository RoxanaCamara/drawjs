import canvasSketch from "canvas-sketch";
import { useEffect, useRef } from "react";

class Square {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw(context) {
    //cuadrado
    context.lineWidth = 14;
    context.beginPath();
    context.rect(this.x, this.y, this.w, this.h);
    context.stroke();
  }
}

class HandleSquare {
  constructor(width, height) {
    this.create(width, height);
    this.createRandom(width);
  }

  create(width, height) {
    let agents = [];

    const w = width * 0.1;
    const h = height * 0.1;
    const gap = width * 0.03;
    const ix = width * 0.17;
    const iy = height * 0.17;

    let x, y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = ix + (w + gap) * i;
        y = iy + (h + gap) * j;

        let newSquare = new Square(x, y, w, h);
        agents.push(newSquare);
      }
      this.square = agents;
    }
  }

  draw(context) {
    this.square.forEach((element) => {
      element.draw(context);
    });
  }

  createRandom(width) {
    let agentsRandom = [];
    this.square.forEach((element) => {
      const off = width * 0.02;
      if (Math.random() > 0.5) {
        let newSquareRandom = new Square(
          element.x + off / 2,
          element.y + off / 2,
          element.w - off,
          element.h - off
        );

        agentsRandom.push(newSquareRandom);
      }
    });
    this.squareRandom = agentsRandom;
  }

  drawRandom(context) {
    this.squareRandom.forEach((element) => {
      element.draw(context);
    });
  }
}

const Scketch_01 = () => {
  const canvasRef = useRef(null);
  const handle = useRef(null);

  const settings = {
    dimensions: [2048, 2048],
    animate: true,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const width = 2048;
    const height = 2048;

    handle.current = new HandleSquare(width, height);
    handle.current.createRandom(width);

    const intervalId = setInterval(() => {
      handle.current.createRandom(width);
    }, 150);

    const sketch = () => {
      return ({ context, width, height }) => {
        context.fillStyle = "white";
        context.fillRect(0, 0, width, height);

        handle.current.draw(context);
        handle.current.drawRandom(context);
      };
    };

    canvasSketch(sketch, {
      ...settings,
      canvas: canvasRef.current,
    });

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Scketch_01;
