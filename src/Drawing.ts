import { canvas, ctx } from "./Canvas";
import { Point } from "./Point";
let lastX: number | undefined, lastY: number | undefined;
let canvasState: Point[][] = [];
let currentLine: Point[] = [];
export function getMousePos(e: MouseEvent) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
		y: ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
	};
}

export function paint(x: number, y: number) {
	ctx.beginPath();
	ctx.moveTo(lastX!, lastY!);
	ctx.lineTo(x, y);
	ctx.closePath();

	ctx.stroke();
	lastX = x;
	lastY = y;

	currentLine.push({
		x: lastX,
		y: lastY,
		color: ctx.strokeStyle.toString(),
	});
}

export function drawing(event: MouseEvent) {
	const mousePos = getMousePos(event);
	paint(mousePos.x, mousePos.y);
}

export function undo() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	console.log(canvasState);
	let lastState = canvasState.pop();
	while (lastState && lastState.length == 0) {
		lastState = canvasState.pop();
	}

	for (let drawLine of canvasState) {
		if (drawLine.length < 1) {
			continue;
		}
		let pLast = drawLine[0];
		console.log(pLast);
		ctx.beginPath();
		ctx.strokeStyle = pLast.color;
		for (let i = 1; i < drawLine.length - 1; i++) {
			let p = drawLine[i];
			ctx.moveTo(pLast.x, pLast.y);
			ctx.lineTo(p.x, p.y);

			pLast = p;
			lastX = pLast.x;
			lastY = pLast.y;
		}

		ctx.closePath();
		ctx.stroke();
	}

	lastX = undefined;
	lastY = undefined;
}

export function clearAll() {
	currentLine = [];
	canvasState = [];
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	lastX = undefined;
	lastY = undefined;
}

export function saveState() {
	canvasState.push(currentLine);
	currentLine = [];
	lastX = undefined;
	lastY = undefined;
}
