const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const largura = 400;
const altura = 400;

const corVivo = '#2C8F41';
const corMorto = '#90D272';

let matriz;
let linhas;
let colunas;
const densidade = 20;

function config() {
	canvas.width = largura;
	canvas.height = altura;

	colunas = largura / densidade;
	linhas = altura / densidade;

	matriz = criaMatriz(linhas, colunas);
}

function aleatorio() {
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

function desenhar() {
	console.log('Desenhando frame...');
	for (i = 0; i < colunas; i++) {
		for (j = 0; j < linhas; j++) {
			let x = i * densidade;
			let y = j * densidade;

			context.fillStyle = corMorto;
			if (matriz[i][j] == 1) {
				context.fillStyle = corVivo;
			}
			context.fillRect(x, y, densidade, densidade);
		}
	}
}

function atualizar() {
	console.log('Realizando update...');
	let atualizacao = criaMatriz(linhas, colunas);
	for (i = 1; i < colunas - 1; i++) {
		for (j = 1; j < linhas - 1; j++) {
			if (matriz[i][j] == 1) {
				// Se estiver viva
				console.log('Célula viva no x:', i, 'y:', j);
				let vizinhos = 0;

				if (matriz[i - 1][j - 1] == 1) vizinhos += 1;
				if (matriz[i - 1][j] == 1) vizinhos += 1;
				if (matriz[i - 1][j + 1] == 1) vizinhos += 1;
				if (matriz[i][j - 1] == 1) vizinhos += 1;
				if (matriz[i][j + 1] == 1) vizinhos += 1;
				if (matriz[i + 1][j - 1] == 1) vizinhos += 1;
				if (matriz[i + 1][j] == 1) vizinhos += 1;
				if (matriz[i + 1][j + 1] == 1) vizinhos += 1;

				console.log('com', vizinhos, 'vizinhos');
				if (vizinhos < 2) {
					// Morre de solidão
					console.log('Morreu de solidão com', vizinhos, 'vizinhos, no x:', i, 'y:', j);
					atualizacao[i][j] = 0;
				} else if (vizinhos > 3) {
					// Morre de superpopulação
					console.log('Morreu de superpopulação com', vizinhos, 'vizinhos, no x:', i, 'y:', j);

					atualizacao[i][j] = 0;
				} else {
					// console.log('Continuou viva com', vizinhos, 'vizinhos, no x:', i, 'y:', j);
					atualizacao[i][j] = 1;
				}
			} else {
				// Se estiver morta
				let vizinhos = 0;

				if (matriz[i - 1][j - 1] == 1) vizinhos += 1;
				if (matriz[i - 1][j] == 1) vizinhos += 1;
				if (matriz[i - 1][j + 1] == 1) vizinhos += 1;
				if (matriz[i][j - 1] == 1) vizinhos += 1;
				if (matriz[i][j + 1] == 1) vizinhos += 1;
				if (matriz[i + 1][j - 1] == 1) vizinhos += 1;
				if (matriz[i + 1][j] == 1) vizinhos += 1;
				if (matriz[i + 1][j + 1] == 1) vizinhos += 1;

				if (vizinhos == 3) {
					// Nasce
					console.log('Nasceu nova célula no x:', i, 'y:', j);
					atualizacao[i][j] = 1;
				} else {
					// Nada acontece
					atualizacao[i][j] = 0;
				}
			}
		}
	}

	matriz = atualizacao;
}

function random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function limpar() {
	for (i = 0; i < colunas; i++) {
		for (j = 0; j < linhas; j++) {
			matriz[i][j] = 0;
		}
	}
}

function cruz() {
	console.log('Preparando a cruz...');

	// Desenhando a cruz
	matriz[9][10] = 1;
	matriz[10][9] = 1;
	matriz[10][10] = 1;
	matriz[10][11] = 1;
	matriz[11][10] = 1;
}

function glider() {
	console.log('Preparando o glider...');

	// Desenhando o glider
	matriz[10][10] = 1;
	matriz[10][9] = 1;
	matriz[10][8] = 1;
	matriz[9][10] = 1;
	matriz[8][9] = 1;
}

function passo() {
	atualizar();
	desenhar();
}

function exemploCruz() {
	limpar();
	cruz();
	desenhar();
}

function exemploGlider() {
	limpar();
	glider();
	desenhar();
}

function play() {
	continuar = true;
	repetir(passo, 500);
}

let continuar = true;

function repetir(callback, interval) {
	let repeatTimes = 0;
	let repeated = 1;
	const intervalTask = setInterval(doTask, interval);

	function doTask() {
		if (repeated > repeatTimes && continuar) {
			callback();
			repeated += 1;
		} else {
			clearInterval(intervalTask);
		}
	}
}

function stop() {
	continuar = false;
}

config();
limpar();
cruz();
desenhar();
