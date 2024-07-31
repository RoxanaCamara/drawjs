import canvasSketch from "canvas-sketch";
import { random } from "canvas-sketch-util";
import math from "canvas-sketch-util/math";
import { useEffect, useRef } from "react";

class Effect {
  constructor(i, width, height, num) {
    let s = math.degToRad(360 / num);
    let r = width * 0.3;
    let a = s * i;

    this.width = width;
    this.height = height;

    this.slice = s;
    this.angle = a;
    this.radius = r;

    this.cx = width * 0.5;
    this.cy = height * 0.5;

    this.framesPerSecond = 60; // Asumiendo 60 FPS
    this.speedFactor = (2 * Math.PI) / (this.framesPerSecond * 10);
  }

  draw(context) {
    this.angle += this.speedFactor;
    let x = this.cx + this.radius * Math.sin(this.angle);
    let y = this.cy + this.radius * Math.cos(this.angle);
    let w = this.width * 0.01;
    let h = this.height * 0.1;

    context.save();
    context.translate(x, y);
    context.rotate(-this.angle);
    context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

    context.beginPath();
    context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
    context.fill();
    context.restore();

    context.save();
    context.translate(this.cx, this.cy);
    context.rotate(-this.angle);

    context.lineWidth = random.range(5, 20);
    context.beginPath();
    context.arc(
      0,
      0,
      this.radius * random.range(0.7, 1.3),
      this.slice * random.range(1, -8),
      this.slice * random.range(1, 5)
    );
    context.stroke();

    context.restore();
  }
}

class CircleEffect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.effect = [];
  }

  create() {
    let NUM = 40;
    let list = [];
    for (let i = 0; i < NUM; i++) {
      let n = new Effect(i, this.width, this.height, NUM);
      list.push(n);
    }

    this.effect = list;
  }

  draw(context) {
    context.fillStyle = "black";
    if (this.effect.length > 0) {
      this.effect.forEach((element) => {
        element.draw(context);
      });
    }
  }
}

const Scketch_02 = () => {
  const canvasRef = useRef(null);
  const circleEffectRef = useRef(null);

  const settings = {
    dimensions: [1080, 1080],
    animate: true,
  };

  circleEffectRef.current = new CircleEffect(1080, 1080);

  useEffect(() => {
    const intervalId = setInterval(() => {
      circleEffectRef.current.create();
    }, 1000);

    const sketch = () => {
      return ({ context, width, height }) => {
        context.fillStyle = "white";
        context.fillRect(0, 0, width, height);
        circleEffectRef.current.draw(context);
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

export default Scketch_02;
