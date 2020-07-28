import Game from "./game.js"

var game = new Game();
// fps para mostrar por pantalla
let fps = document.getElementById("fps");

// tiempo actual 
let currTime = new Date().getTime();

let snapTime = 0;
let avgFps = 0;

// cuantas piezas han caido
let turn = 0;

// generates a new bag of pieces
let bag = game.generateBag();

// pieza que actualmente esta cayendo
let currentPiece;

/**
 * Main loop
 */
; (function () {

    const time = 500;

    game.setUp(bag);

    function main() {
        window.requestAnimationFrame(main);

        myTimer(time, update);

        render();
    }
    main(); // Start the cycle
})();

/**
 * Updates the elements of the game
 */
function update() {

    let currentPiece = game.getBoard.getFallingPiece;

    /**
     * checks if the piece is colliding with the ground or with another piece..
     * If false: 
     *      · checks if there're completed lines
     *      · creates a new piece
     *      · add 1 to tunrn variable
     */
    if (currentPiece.checkVerticalColision()) {
        currentPiece.movY();
        return;
    }

    if ((turn % 7 === 0)) {
        game.generateBag().forEach(pieceIndex => {
            bag.push(pieceIndex);
        });

        console.log(bag);
    }

    game.getBoard.checkCompleteLines();
    game.getBoard.newPiece(bag[turn % 7]);
    bag.shift();
    console.log(bag);
    turn++;


}

/**
 * Renders all the elements of the game
 */
function render() {
    showFPSaverage();
    game.getBoard.drawme();
    // game.getBoard.getPieces.forEach(piece => piece.drawme());
}


/**
 * Executes a function of this file if specified time has passed between calls
 * @param {*} time time to pass
 * @param {*} func function to execute
 */
function myTimer(time, func) {

    let diffTime = new Date().getTime() - snapTime;

    if (diffTime > time) {
        snapTime = new Date().getTime();
        func();
    }
}


/**
 * Muestra los fos por la pantalla
 */
function showFPSaverage() {

    avgFps++;

    if (new Date().getTime() - currTime >= 1000) {
        fps.innerHTML = avgFps;
        currTime = new Date().getTime();
        avgFps = 0;
    }
}

