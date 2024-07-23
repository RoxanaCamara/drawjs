import canvasSketch from "canvas-sketch";
import { useEffect, useRef } from "react";
import { random } from "canvas-sketch-util";

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class AgentDot {
  constructor(x, y) {
    this.pos = new Point(x, y);
    this.vel = new Point(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12);
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.lineWidth = 4;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 5);
    context.fill();
    context.stroke();
    context.restore();
  }
}

const Scketch_06 = () => {
  const settings = {
    dimensions: [2048, 2048],
  };

  const canvasRef = useRef(null);

  const createDots = (width, height) => {
    const agents = [];

    for (let i = 0; i < 40; i++) {
      const x = random.range(0, width);
      const y = random.range(0, height);

      agents.push(new AgentDot(x, y));
    }
    return agents;
  };

  const sketch = () => {
    return ({ context, width, height }) => {
      context.fillStyle = "white";
      context.fillRect(0, 0, width, height);

      const dots = createDots(width, height);

      dots.forEach((agent) => {
        agent.draw(context);
      });
    };
  };

  useEffect(() => {
    canvasSketch(sketch, {
      ...settings,
      canvas: canvasRef.current,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <canvas ref={canvasRef}></canvas>;
};
export default Scketch_06;
