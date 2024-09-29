var cells = document.getElementsByTagName('td');
var x = '<i class="i-xmark"></i>';
var o = '<i class="i-o"></i>';
var body = document.getElementsByTagName('body');
var gameOverScreen = document.getElementById('gameoverscreen');
var winPlayerScreen = document.getElementById('winplayer');
var restartButton = document.getElementById('restartbtn');
var winspanplayer = document.getElementById('winspanplayer');
var game = true;
var winnerNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 3, 6, 1, 4, 7, 2, 5, 8, 0, 4, 8, 2, 4, 6];
var XorO = true;
var moves = 0;
var findWinner = false;

function fillX(tag) {
    cells[tag].innerHTML = x;
    moves++;
    XorO = false;
}

function fillO(tag) {
    cells[tag].innerHTML = o;
    moves++;
    XorO = true;
}

function fillCell(num) {
    if (!game || cells[num].innerHTML !== '') {
        return;
    }
    if (XorO) {
        fillX(num);
    } else {
        fillO(num);
    }
    for (i = 0; i !== winnerNumbers.length + 3; i = i + 3) {
        if (findWinner) {
            break;
        }
        checkWinner(winnerNumbers[i], winnerNumbers[i + 1], winnerNumbers[i + 2]);
    }
    if (i === winnerNumbers.length + 3) {
        alertInfo('draw', -1, -1, -1);
    }
}

function alertInfo(xo, a, b, c) {
    if (xo === 'draw' && moves === 9) {
        winspanplayer.innerHTML = 'Ничья!';
    } else {
        if (a === -1) {
            return;
        }
        winPlayerScreen.innerHTML = xo;
        cells[a].setAttribute('class', 'backgrCells');
        cells[b].setAttribute('class', 'backgrCells');
        cells[c].setAttribute('class', 'backgrCells');
    }
    gameOverScreen.removeAttribute('style');
    restartButton.removeAttribute('style');
}

function addWinner(a, b, c) {
    game = false;
    findWinner = true;
    if (cells[a].innerHTML === x) {
        alertInfo(x, a, b, c);
    }
    if (cells[a].innerHTML === o) {
        alertInfo(o, a, b, c);
    }
}

function checkWinner(a, b, c) {
    if (a == undefined) {
        return;
    }
    if ((cells[a].innerHTML === '') || (cells[b].innerHTML === '') || (cells[c].innerHTML === '')) {
        return;
    }
    if ((cells[a].innerHTML === cells[b].innerHTML) && (cells[a].innerHTML === cells[c].innerHTML)) {
        addWinner(a, b, c);
    }
}

function replay() {
    for (let i = 0; i !== 9; i++) {
        moves = 0;
        XorO = true;
        game = true;
        findWinner = false;
        cells[i].removeAttribute('class');
        cells[i].innerHTML = '';
        gameOverScreen.setAttribute('style', 'display: none;');
        restartButton.setAttribute('style', 'display: none;');
        winspanplayer.innerHTML = '<span id="winplayer"></span> выйграл!';
        winPlayerScreen = document.getElementById('winplayer');
    }
}
