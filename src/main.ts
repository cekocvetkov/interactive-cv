import { filter, fromEvent, mergeMap, takeUntil, tap } from "rxjs";
import { setColor } from "./Canvas";
import { clearAll, drawing, saveState, undo } from "./Drawing";
import "./styles.css";

const RIGHT_CLICK = 2;

document.addEventListener("DOMContentLoaded", () => {
	forbidContextMenuRightClick();

	const $mouseMove = fromEvent(document, "mousemove");
	const $mouseDown = fromEvent(document, "mousedown");
	const $mouseUp = fromEvent(document, "mouseup");
	const $clearAll = fromEvent(document.getElementById("clearAll")!, "click");
	const $undo = fromEvent(document.getElementById("undo")!, "click");
	const $colorPaletteClick = fromEvent(document.getElementById("color-picker")!, "click");
	const $colorPaletteChange = fromEvent(document.getElementById("color-picker")!, "change");

	$clearAll.subscribe(() => clearAll());
	$undo.subscribe(() => undo());
	$colorPaletteClick.subscribe(() => document.getElementById("color-picker-input")?.click());
	$colorPaletteChange.subscribe((event) => {
		console.log((<HTMLTextAreaElement>event.target).value);
		setColor((<HTMLTextAreaElement>event.target).value);
	});

	const $paint = $mouseDown.pipe(
		tap((e: any) => console.log(e.button)),
		filter((e: any) => e.button === RIGHT_CLICK),
		mergeMap((down) => $mouseMove.pipe(takeUntil($mouseUp.pipe(filter((e: any) => e.button === RIGHT_CLICK)))))
	);

	$mouseUp.subscribe(() => {
		console.log("save");
		saveState();
	});

	$paint.subscribe((e: any) => drawing(e));
});

export function forbidContextMenuRightClick() {
	const $contextMenu = fromEvent(document, "contextmenu");
	$contextMenu.subscribe((e) => {
		e.preventDefault();
		return false;
	});
}
