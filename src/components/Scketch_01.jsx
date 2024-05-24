import canvasSketch from "canvas-sketch";
import { useEffect, useRef } from "react";

const Scketch_01 = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const settings = {
			dimensions: [2048, 2048],
		};

		const drawBox = (context, width, height) => {
			context.fillStyle = "white";
			context.fillRect(0, 0, width, height);
		};

		const drawRow = (context, width, height) => {
			const w = width * 0.1;
			const h = height * 0.1;
			const gap = width * 0.03;
			const ix = width * 0.17;
			const iy = height * 0.17;

			const off = width * 0.02;

			let x, y;

			for (let i = 0; i < 5; i++) {
				for (let j = 0; j < 5; j++) {
					x = ix + (w + gap) * i;
					y = iy + (h + gap) * j;

					drawSquare(context, x, y, w, h);

					if (Math.random() > 0.5) {
						drawSquare(context, x + off / 2, y + off / 2, w - off, h - off);
					}
				}
			}
		};

		/*const drawCircle = (context, width, height) => {
			//circulo
			context.beginPath();
			context.arc(300, 300, 100, 0, Math.PI * 2);
			context.stroke();
		};**/

		const drawSquare = (context, x, y, w, h) => {
			//cuadrado
			context.lineWidth = 14;
			context.beginPath();
			context.rect(x, y, w, h);
			context.stroke();
		};

		const sketch = () => {
			return ({ context, width, height }) => {
				drawBox(context, width, height);
				drawRow(context, width, height);
			};
		};

		canvasSketch(sketch, {
			...settings,
			canvas: canvasRef.current,
		});
	}, []);

	return <canvas ref={canvasRef}></canvas>;
};

export default Scketch_01;
