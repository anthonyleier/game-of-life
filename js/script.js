const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const largura = window.innerWidth;
const altura = window.innerHeight - 1;

const qtdPixelLargura = 20;
const qtdPixelAltura = 20;

const pixelLargura = largura / qtdPixelLargura;
const pixelAltura = altura / qtdPixelAltura;

const matrizLargura = largura / pixelLargura;
const matrizAltura = altura / pixelAltura;

function start() {
	let matriz = estrutura();
	atualizarFrame(matriz);
}

function estrutura() {
	canvas.width = largura;
	canvas.height = altura;

	let vetor = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	];

	return vetor;
}

function atualizarFrame(matriz) {
	x = 0;
	y = 0;
	for (i = 0; i < qtdPixelAltura; i++) {
		for (j = 0; j < qtdPixelLargura; j++) {
			context.fillStyle = '#000';
			context.strokeRect(x, y, pixelLargura, pixelAltura);
			console.log('Cubo - Número:', j, 'X:', x, 'Y:', y, 'Largura:', pixelLargura, 'Altura:', pixelAltura);
			x += pixelLargura;
		}
		y += pixelAltura;
		x = 0;
	}
}

start();
