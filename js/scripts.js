const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const largura = 400;
const altura = 400;
const tamanho = 10;

let matriz;
let linhas;
let colunas;
const densidade = 40;

function config() {
	canvas.width = largura;
	canvas.height = altura;

	colunas = largura / densidade;
	linhas = altura / densidade;

	matriz = criaMatriz(linhas, colunas);

	for (i = 0; i < colunas; i++) {
		for (j = 0; j < linhas; j++) {
			matriz[i][j] = Math.floor(random(0, 2));
		}
	}
}

function criaMatriz(colunas, linhas) {
	let vetor = new Array(colunas);
	for (i = 0; i < colunas; i++) {
		vetor[i] = new Array(linhas);
	}
	return vetor;
}

function frame() {
	for (i = 0; i < colunas; i++) {
		for (j = 0; j < linhas; j++) {
			let x = i * densidade;
			let y = j * densidade;
			if (matriz[i][j] == 1) {
				context.fillStyle = 'blue';
			} else {
				context.fillStyle = 'red';
			}

			context.fillRect(x, y, densidade, densidade);
		}
	}
}

function random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

config();
frame();
