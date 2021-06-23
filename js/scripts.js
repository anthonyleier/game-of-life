const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const largura = 800;
const altura = 800;

const corVivo = '#2C8F41';
const corMorto = '#90D272';

let matriz;
let linhas;
let colunas;
const densidade = 20;
let continuar = true;

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
				let vizinhos = vizinhanca(i, j);

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
				let vizinhos = vizinhanca(i, j);

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

function vizinhanca(i, j) {
	let vizinhos = 0;
	let x = i;
	let y = j;

	if (x > -1 && y > -1 && matriz[x - 1][y - 1] == 1) vizinhos += 1;
	if (x > -1 && y > -1 && matriz[x - 1][y] == 1) vizinhos += 1;
	if (x > -1 && y > -1 && matriz[x - 1][y + 1] == 1) vizinhos += 1;
	if (x > -1 && y > -1 && matriz[x][y - 1] == 1) vizinhos += 1;
	if (x > -1 && y > -1 && matriz[x][y + 1] == 1) vizinhos += 1;
	if (x > -1 && y > -1 && matriz[x + 1][y - 1] == 1) vizinhos += 1;
	if (x > -1 && y > -1 && matriz[x + 1][y] == 1) vizinhos += 1;
	if (x > -1 && y > -1 && matriz[x + 1][y + 1] == 1) vizinhos += 1;

	return vizinhos;
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

function repetir(callback, interval) {
	const intervalTask = setInterval(doTask, interval);

	function doTask() {
		if (continuar) {
			callback();
		} else {
			clearInterval(intervalTask);
		}
	}
}

function mouse() {
	canvas.addEventListener('mousedown', function (e) {
		click(canvas, e);
	});
}

function click(canvas, event) {
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	trocarPixel(x, y);
}

function trocarPixel(x, y) {
	linha = Math.floor(x / densidade);
	coluna = Math.floor(y / densidade);

	if (matriz[linha][coluna] == 0) matriz[linha][coluna] = 1;
	else matriz[linha][coluna] = 0;

	desenhar();
}

function passo() {
	atualizar();
	desenhar();
}

function reset() {
	continuar = false;
	limpar();
	desenhar();
}

function iniciar() {
	continuar = true;
	repetir(passo, 500);
}

function parar() {
	continuar = false;
}

config();
limpar();
desenhar();
mouse();
