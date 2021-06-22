const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const largura = 400;
const altura = 400;
const tamanho = 10;

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
	console.log('Desenhando...');
	for (i = 0; i < colunas; i++) {
		for (j = 0; j < linhas; j++) {
			let x = i * densidade;
			let y = j * densidade;

			context.fillStyle = 'red';
			if (matriz[i][j] == 1) {
				context.fillStyle = 'blue';
			}

			context.fillRect(x, y, densidade, densidade);
		}
	}
	console.table(matriz);
}

// Qualquer célula viva com menos de dois vizinhos vivos morre de solidão.
// Qualquer célula viva com mais de três vizinhos vivos morre de superpopulação.
// Qualquer célula com exatamente três vizinhos vivos se torna uma célula viva.
// Qualquer célula com dois vizinhos vivos continua no mesmo estado para a próxima geração.

function update() {
	console.log('Realizando Update...');
	let atualizacao = criaMatriz(linhas, colunas);
	for (i = 1; i < colunas - 1; i++) {
		for (j = 1; j < linhas - 1; j++) {
			if (matriz[i][j] == 1) {
				console.log('Célula viva no', i, j);
				// Se estiver viva
				let vizinhos = 0;

				if (matriz[i - 1][j - 1] == 1) vizinhos += 1;

				if (matriz[i - 1][j] == 1) vizinhos += 1;

				if (matriz[i - 1][j + 1] == 1) vizinhos += 1;

				if (matriz[i][j - 1] == 1) vizinhos += 1;

				if (matriz[i][j + 1] == 1) vizinhos += 1;

				if (matriz[i + 1][j - 1] == 1) vizinhos += 1;

				if (matriz[i + 1][j] == 1) vizinhos += 1;

				if (matriz[i + 1][j + 1] == 1) vizinhos += 1;
				console.log('com', vizinhos);
				if (vizinhos < 2) {
					// Morre de solidão
					// console.log('Morreu de solidão com', vizinhos, 'no', i, j);
					atualizacao[i][j] = 0;
				} else if (vizinhos > 3) {
					// Morre de superpopulação
					// console.log('Morreu de superpopulação com', vizinhos, 'no', i, j);

					atualizacao[i][j] = 0;
				} else {
					// console.log('Continuou viva com', vizinhos, 'no', i, j);
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
					console.log('Nasceu nova célula no', i, j);
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

function cruz() {
	console.log('Desenhando a forma...');

	// Limpando a tabela
	for (i = 0; i < colunas; i++) {
		for (j = 0; j < linhas; j++) {
			matriz[i][j] = 0;
		}
	}

	// Desenhando a cruz
	matriz[9][10] = 1;
	matriz[10][9] = 1;
	matriz[10][10] = 1;
	matriz[10][11] = 1;
	matriz[11][10] = 1;
}

config();
frame();

cruz();
frame();

setTimeout(() => {
	update();
	frame();
}, 5000);
