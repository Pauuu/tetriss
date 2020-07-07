import Game from "./game.js"

var game = new Game();
// fps para mostrar por pantalla
let fps = document.getElementById("fps");

// tiempo actual (que sorpresa eh...)
let currTime = new Date().getTime();

let snapTime = 0;
let avgFps = 0;

var __indicador__ = 0;

/**
 * Main loop
 */
; (function () {

    const time = 200;

    game.setUp();

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


    let direction = 1;

    if (game.getBoard.getPieces[game.getBoard.getLastPieceIndex].checkVerticalColision()){
        game.getBoard.getPieces[game.getBoard.getLastPieceIndex].movY();
    } 
    else {
        game.newPiece(2);
    }
}


/**
 * Renders all the elements of the game
 */
function render() {
    showFPSaverage();
    game.getBoard.drawme();
    game.getBoard.getPieces.forEach(piece => piece.drawme());
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

