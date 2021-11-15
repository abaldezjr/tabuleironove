let tiles = [], resposta = [];

function inicializar() {
	let startScreen = document.querySelector("#startScreen");
	startScreen.addEventListener("click", startGame, false);
	for (let i = 1; i < 9; i++) {
		let tile = document.querySelector("#n" + i);
		tile.style.background = "url('./img/" + i + ".png')";
		tile.addEventListener("click", moveTile, false);
		tiles.push(tile);
		resposta = tiles;
	}
	tiles.push(null);
	desenha();
}

function desenha() {
	for (let i in tiles) {
		let tile = tiles[i];
		if (tile) {
			tile.style.left = (i % 3) * 100 + 5 + "px";
			if (i < 3) {
				tile.style.top = "5px";
			} else {
				if (i < 6) {
					tile.style.top = "105px";
				} else {
					tile.style.top = "205px";
				}
			}
		}
	}
}

function moveTile() {
	let index = tiles.indexOf(this);
	if (index % 3 !== 0) {
		if (!tiles[index - 1]) {
			tiles[index - 1] = this;
			tiles[index] = null;
		}
	}

	if (index % 3 !== 2) {
		if (!tiles[index + 1]) {
			tiles[index + 1] = this;
			tiles[index] = null;
		}
	}

	if (index > 2) {
		if (!tiles[index - 3]) {
			tiles[index - 3] = this;
			tiles[index] = null;
		}
	}

	if (index < 6) {
		if (!tiles[index + 3]) {
			tiles[index + 3] = this;
			tiles[index] = null;
		}
	}
	desenha();
	if (vitoria()) {
		gameOver();
	}
}

function vitoria() {
	for (let i in tiles) {
		if (tiles[i] !== resposta[i]) {
			return false;
		}
	}
	return true;
}

function gameOver() {
	let overScreen = document.querySelector("#overScreen");
	overScreen.style.opacity = "1";
	overScreen.style.zIndex = "1";
	setTimeout(function () {
		overScreen.addEventListener("click", startGame, false);
	}, 500);
}

function embaralha(velhoArray) {
	let novoArray;
	do {
		novoArray = [];
		while (novoArray.length < velhoArray.length) {
			let i = Math.floor((Math.random() * velhoArray.length) + 0);
			if (novoArray.indexOf(velhoArray[i]) < 0) {
				novoArray.push(velhoArray[i]);
			}
		}
	} while (!validGame(novoArray));
	return novoArray;
}
function validGame(array) {
	let inversions = 0;
	let len = array.length;
	for (let i = 0; i < len - 1; i++) {
		for (let j = i + 1; j < len; j++) {
			if (array[i] && array[j] && array[i].dataset.value < array[j].dataset.value) {
				inversions++;
			}
		}
	}
	return inversions % 2 === 0;
}

function startGame() {
	tiles = embaralha(tiles);
	this.style.opacity = 0;
	this.style.zIndex = -1;
	this.removeEventListener("click", startGame, false);
	desenha();
}

inicializar();