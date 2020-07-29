import Game from "./game.js"

var game = new Game();
// fps para mostrar por pantalla
let fps = document.getElementById("fps");

// tiempo actual 
let currTime = new Date().getTime();

let snapTime = 0;
let avgFps = 0;

/**
 * Main loop
 */
; (function () {

    const time = 10;

    game.setUp();

    function main() {
        window.requestAnimationFrame(main);

        // myTimer(time, game.update);

        let diffTime = new Date().getTime() - snapTime;

        if (diffTime > time) {
            snapTime = new Date().getTime();
            game.update();
        }

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
    console.log(bag);
    console.log("antes : " + JSON.parse(JSON.stringify(bag)));

    if ((turn % 7 === 0)) {
        game.generateBag().forEach(pieceIndex => {
            bag.push(pieceIndex);
        });
    }

    console.log("despues : " + JSON.parse(JSON.stringify(bag)));


    bag.shift();
    game.getBoard.checkCompleteLines();
    game.getBoard.newPiece(bag[0]);
    console.log(bag[0]);
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

