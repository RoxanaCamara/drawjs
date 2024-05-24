import canvasSketch from "canvas-sketch";
import { random } from "canvas-sketch-util";
import math from "canvas-sketch-util/math";
import { useEffect, useRef } from "react";

const Scketch_02 = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const settings = {
			dimensions: [1080, 1080],
		};

		const drawBox = (context, width, height) => {
			context.fillStyle = "white";
			context.fillRect(0, 0, width, height);
		};

		const drawCircle = (context, radius, slice) => {
			context.lineWidth = random.range(5, 20);
			context.beginPath();
			context.arc(
				0,
				0,
				radius * random.range(0.7, 1.3),
				slice * random.range(1, -8),
				slice * random.range(1, 5)
			);
			context.stroke();
		};

		const drawMarionetEffect = (context, width, height) => {
			const cx = width * 0.5;
			const cy = height * 0.5;

			const w = width * 0.01;
			const h = height * 0.1;
			let x, y;

			const num = 40;
			const radius = width * 0.3;
			for (let i = 0; i < num; i++) {
				const slice = math.degToRad(360 / num);
				const angle = slice * i;

				x = cx + radius * Math.sin(angle);
				y = cy + radius * Math.cos(angle);

				context.save();
				context.translate(x, y);
				context.rotate(-angle);
				context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

				context.beginPath();
				context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
				context.fill();
				context.restore();

				context.save();
				context.translate(cx, cy);
				context.rotate(-angle);

				drawCircle(context, radius, slice);

				context.restore();
			}
		};

		const sketch = () => {
			return ({ context, width, height }) => {
				drawBox(context, width, height);

				context.fillStyle = "black";

				//setInterval(() => {
				drawMarionetEffect(context, width, height);
				//}, 3000);

				//borrar todo
				//context.clearRect(0, 0, width, height);
			};
		};

		canvasSketch(sketch, {
			...settings,
			canvas: canvasRef.current,
		});
	}, []);

	return <canvas ref={canvasRef}></canvas>;
};

export default Scketch_02;
