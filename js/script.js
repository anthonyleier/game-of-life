const universalWidth = window.innerWidth;
const universalHeight = window.innerHeight;

function draw() {
	canvas.width = universalWidth;
	canvas.height = universalHeight;
	if (canvas.getContext) {
		pixel(universalWidth / 2, universalHeight / 2, 10, '#003A00');
	}
}

function pixel(x, y, size, color) {
	let canvas = document.getElementById('canvas');
	let paint = canvas.getContext('2d');
	paint.fillStyle = color;
	paint.fillRect(x, y, size, size);
}
