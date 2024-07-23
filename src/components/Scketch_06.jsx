import canvasSketch from "canvas-sketch";
import { useEffect, useRef } from "react";
import { AgentDot } from "./class/Point";
import { random } from "canvas-sketch-util";

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
