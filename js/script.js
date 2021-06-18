const universalWidth = window.innerWidth;
const universalHeight = window.innerHeight;
const canvas = document.querySelector('canvas');

function draw() {
	mouseObserver();

	canvas.width = universalWidth;
	canvas.height = universalHeight;
}

function pixel(x, y) {
	let paint = canvas.getContext('2d');
	paint.fillStyle = '#000';
	paint.fillRect(x, y, 10, 10);
}

function mouseObserver() {
	canvas.addEventListener('mousedown', function (e) {
		getCursorPosition(canvas, e);
	});
}

function getCursorPosition(canvas, event) {
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	change(x, y);
}

function change(x, y) {
	console.log('antes:', x, y);
	x = Math.round(x / 10) * 10;
	y = Math.round(y / 10) * 10;
	console.log('depois:', x, y);
	pixel(x, y);
}
