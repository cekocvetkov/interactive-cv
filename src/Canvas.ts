const LINE_WIDTH = 2;

const canvasElement = createCanvas();
const contextElement = createContext();

function createCanvas(): HTMLCanvasElement {
	console.log("createCanvas");
	const canvas = document.getElementById("canvas") as HTMLCanvasElement;
	canvas.width = screen.width;
	canvas.height = screen.height;

	return canvas;
}

function createContext(): CanvasRenderingContext2D {
	console.log("createContext");

	const ctx: CanvasRenderingContext2D = canvasElement.getContext("2d") as CanvasRenderingContext2D;
	ctx.lineWidth = LINE_WIDTH;
	ctx.strokeStyle = "black";

	return ctx;
}

export const setColor = function (color: string): void {
	ctx.strokeStyle = color;
};

export const canvas: HTMLCanvasElement = canvasElement;
export const ctx: CanvasRenderingContext2D = contextElement;
