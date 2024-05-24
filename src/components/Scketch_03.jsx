import canvasSketch from "canvas-sketch";

import { useEffect, useRef } from "react";
import { Agent } from "./class/Agent";
import { math, random } from "canvas-sketch-util";

const Scketch_03 = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const settings = {
			dimensions: [1080, 1080],
			animate: true,
		};

		const sketch = ({ width, height }) => {
			const agents = [];

			for (let i = 0; i < 40; i++) {
				const x = random.range(0, width);
				const y = random.range(0, height);

				agents.push(new Agent(x, y));
			}

			return ({ context, width, height }) => {
				context.fillStyle = "white";
				context.fillRect(0, 0, width, height);

				for (let i = 0; i < agents.length; i++) {
					const agent = agents[i];

					for (let j = i + 1; j < agents.length; j++) {
						const other = agents[j];

						const dist = agent.pos.getDistance(other.pos);

						if (dist > 200) continue;

						context.lineWidth = math.mapRange(dist, 0, 200, 12, 1);

						context.beginPath();
						context.moveTo(agent.pos.x, agent.pos.y);
						context.lineTo(other.pos.x, other.pos.y);
						context.stroke();
					}
				}

				agents.forEach((agent) => {
					agent.update();
					agent.draw(context);
					agent.bounce(width, height);
				});
			};
		};
		canvasSketch(sketch, {
			...settings,
			canvas: canvasRef.current,
		});
	}, []);

	return <canvas ref={canvasRef}></canvas>;
};

export default Scketch_03;
