const largura = window.innerWidth;
const altura = window.innerHeight;
const canvas = document.querySelector('canvas');
const pixelTamanho = 10;
const pixelsLargura = largura / pixelTamanho;
const pixelsAltura = altura / pixelTamanho;

function start() {
	atualizarFrame();
}

function atualizarFrame() {
	for (i = 0; i < pixelsLargura; i++) {
		pixel(i, 0);
		console.log(i, 50);
	}
}

function draw() {
	mouseObserver();
	start();
	let paint = canvas.getContext('2d');
	paint.fillStyle = '#000';
	paint.fillRect(0, 0, 10, 10);
	canvas.width = largura;
	canvas.height = altura;
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
	x = Math.round(x / 10) * 10;
	y = Math.round(y / 10) * 10;
	pixel(x, y);
}

// Render != Info
// Usar exemplo do deschamps
// Primeiro altera um array
// Depois atualiza tudo
// Aumentar tamanho dos pixels
